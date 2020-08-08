import {
  composeRequestInterceptor,
  Constructor,
  Deprecated,
  invokeMethod,
  RequestInterceptor,
  ServiceIdentifier,
} from '@sensejs/core';
import {RequestListener} from 'http';
import {Container} from 'inversify';
import Koa from 'koa';
import koaBodyParser, {Options as KoaBodyParserOption} from 'koa-bodyparser';
import KoaRouter from '@koa/router';
import KoaCors from '@koa/cors';
import {
  HttpAdaptor,
  HttpApplicationOption,
  HttpContext,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from './http-abstract';
import {uniq} from 'lodash';
import koaQs from 'koa-qs';
import {ControllerMetadata, getRequestMappingMetadata, HttpMethod} from './http-decorators';
import Router from '@koa/router';

interface MethodRouteSpec<T = any> {
  path: string;
  httpMethod: HttpMethod;
  interceptors: Constructor<HttpInterceptor>[];
  targetConstructor: Constructor<T>;
  targetMethod: keyof T;
}

interface ControllerRouteSpec {
  path: string;
  methodRouteSpecs: MethodRouteSpec[];
}

export type QueryStringParsingMode = 'simple' | 'extended' | 'strict' | 'first';

export class KoaHttpContext extends HttpContext {
  get request(): HttpRequest {
    const context = this.koaContext;
    const request = context.request as any;
    return {
      query: context.request.query,
      body: request.body,
      protocol: context.protocol,
      url: context.originalUrl,
      path: context.path,
      search: context.search,
      method: context.method,
      params: context.params,
      headers: context.headers,
      hostname: context.request.hostname,
    };
  }

  get response(): HttpResponse {
    const context = this.koaContext;
    return {
      set statusCode(statusCode) {
        context.response.status = statusCode;
      },

      set(key, value) {
        context.response.set(key, value);
      },

      get statusCode() {
        return context.response.status;
      },

      set data(data) {
        context.body = data;
      },

      get data() {
        return context.body;
      },
    };
  }

  get nativeRequest(): unknown {
    return this.koaContext.request;
  }

  get nativeResponse(): unknown {
    return this.koaContext.response;
  }

  constructor(private readonly container: Container, private readonly koaContext: KoaRouter.RouterContext) {
    super();
  }

  bindContextValue<T>(key: ServiceIdentifier<T>, value: T): void {
    this.container.bind(key).toConstantValue(value);
  }

  /**
   * @deprecated
   * @param key
   */
  @Deprecated()
  get<T>(key: ServiceIdentifier<T>): T {
    return this.container.get<T>(key);
  }
}

export class KoaHttpApplicationBuilder extends HttpAdaptor {
  private readonly globalInterceptors: Constructor<HttpInterceptor>[] = [];
  private readonly controllerRouteSpecs: ControllerRouteSpec[] = [];
  private middlewareList: Koa.Middleware[] = [];
  private interceptors: Constructor<HttpInterceptor>[] = [];
  private bodyParserOption?: KoaBodyParserOption;
  private queryStringParsingMode: QueryStringParsingMode = 'simple';

  addControllerWithMetadata(controllerMetadata: ControllerMetadata): this {
    this.interceptors = this.interceptors.concat(controllerMetadata.interceptors);
    const controllerRouteSpec: ControllerRouteSpec = {
      path: controllerMetadata.path,
      methodRouteSpecs: [],
    };
    this.controllerRouteSpecs.push(controllerRouteSpec);

    for (const [key, propertyDescriptor] of Object.entries(
      Object.getOwnPropertyDescriptors(controllerMetadata.prototype),
    )) {
      if (typeof propertyDescriptor.value === 'function') {
        this.addRouterSpec(controllerRouteSpec.methodRouteSpecs, controllerMetadata, controllerMetadata.prototype, key);
      }
    }
    return this;
  }

  clearMiddleware(): this {
    this.middlewareList = [];
    return this;
  }

  addMiddleware(middleware: Koa.Middleware): this {
    this.middlewareList.push(middleware);
    return this;
  }

  setQueryStringParsingMode(mode: QueryStringParsingMode): this {
    this.queryStringParsingMode = mode;
    return this;
  }

  setKoaBodyParserOption(option: KoaBodyParserOption): this {
    this.bodyParserOption = option;
    return this;
  }

  /**
   *
   * @deprecated
   */
  @Deprecated()
  getAllInterceptors(): Constructor<HttpInterceptor>[] {
    const allInterceptors = this.globalInterceptors.concat(this.interceptors);
    return uniq(allInterceptors);
  }

  addGlobalInspector(inspector: Constructor<HttpInterceptor>): this {
    this.globalInterceptors.push(inspector);
    return this;
  }

  build(httpAppOption: HttpApplicationOption, container: Container): RequestListener {
    const koa = this.createKoaInstance();
    const {corsOption, trustProxy = false} = httpAppOption;
    koa.proxy = trustProxy;
    if (corsOption) {
      koa.use(KoaCors(corsOption as KoaCors.Options)); // There are typing errors on @types/koa__cors
    }
    koa.use(koaBodyParser(this.bodyParserOption));
    for (const middleware of this.middlewareList) {
      koa.use(middleware);
    }
    koa.use(this.createGlobalRouter(container));
    return koa.callback();
  }

  private createKoaInstance() {
    const koa = new Koa();
    if (this.queryStringParsingMode === 'simple') {
      return koa;
    }

    return koaQs(koa, this.queryStringParsingMode);
  }

  private addRouterSpec(
    methodRoutSpecs: MethodRouteSpec[],
    controllerMetadata: ControllerMetadata,
    prototype: object,
    method: keyof any,
  ) {
    const requestMappingMetadata = getRequestMappingMetadata(prototype, method);
    if (!requestMappingMetadata) {
      return;
    }

    const {httpMethod, path, interceptors} = requestMappingMetadata;
    this.interceptors = this.interceptors.concat(interceptors);

    methodRoutSpecs.push({
      path,
      httpMethod,
      interceptors: [...this.globalInterceptors, ...controllerMetadata.interceptors, ...interceptors],
      targetConstructor: controllerMetadata.target,
      targetMethod: method,
    });
  }

  private createGlobalRouter(container: Container) {
    const globalRouter = new KoaRouter();
    for (const controllerRouteSpec of this.controllerRouteSpecs) {
      const controllerRouter = new KoaRouter();
      for (const methodRouteSpec of controllerRouteSpec.methodRouteSpecs) {
        this.defineRouter(methodRouteSpec, controllerRouter, container);
      }
      globalRouter.use(controllerRouteSpec.path, controllerRouter.routes(), controllerRouter.allowedMethods());
    }
    return globalRouter.routes();
  }

  private defineRouter<T>(
    methodRouteSpec: MethodRouteSpec<T>,
    controllerRouter: Router<any, {}>,
    container: Container,
  ) {
    const {httpMethod, path, targetConstructor, targetMethod, interceptors} = methodRouteSpec;

    controllerRouter[httpMethod](path, async (ctx) => {
      const childContainer = container.createChild();
      const composedInterceptor = composeRequestInterceptor(childContainer, interceptors);
      childContainer.bind(Container).toConstantValue(childContainer);
      const context = new KoaHttpContext(childContainer, ctx);
      childContainer.bind(HttpContext).toConstantValue(context);
      const interceptor: RequestInterceptor = childContainer.get(composedInterceptor);
      await interceptor.intercept(context, async () => {
        context.response.data = await invokeMethod(childContainer, targetConstructor, targetMethod);
      });
    });
  }
}
