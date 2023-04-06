import {
  AsyncInterceptProvider,
  Class,
  ClassServiceId,
  CompatMiddleware,
  Constructor,
  GeneralServiceId,
  InjectScope,
  Middleware,
  ServiceId,
  Transformer,
} from './types.js';
import {
  assignParamInjectMetadata,
  ensureConstructorParamInjectMetadata,
  ensureMethodInvokeProxy,
  setInjectScope,
} from './metadata.js';

export interface InjectionDecorator {
  <T extends {}>(prototype: T, name: keyof T, index: number): void;
  <T extends Class>(ctor: Class, name: any, index: number): void;
}

export interface InjectOption<T, R> {
  /**
   * Transform the injected target
   */
  transform?: Transformer<T, R>;
}

export function Inject<T, R = T>(serviceId: GeneralServiceId<T>, option?: InjectOption<T, R>): InjectionDecorator;
export function Inject<T extends {}, R = T>(
  serviceId: ClassServiceId<T>,
  option?: InjectOption<T, R>,
): InjectionDecorator;
export function Inject<T, R = T>(serviceId: ServiceId<T>, option: InjectOption<T, R> = {}): InjectionDecorator {
  return (ctor: Class | {}, name: keyof any, index: number): void => {
    if (typeof ctor !== 'function') {
      const x = ensureMethodInvokeProxy(ctor, name);
      assignParamInjectMetadata(x, index, {id: serviceId, ...option});
    } else {
      assignParamInjectMetadata(ctor, index, {id: serviceId, ...option});
    }
  };
}

export function Optional(value = true): InjectionDecorator {
  return (ctor: Class | {}, name: keyof any, index: number): void => {
    if (typeof ctor !== 'function') {
      const x = ensureMethodInvokeProxy(ctor, name);
      assignParamInjectMetadata(x, index, {optional: value});
    } else {
      assignParamInjectMetadata(ctor, index, {optional: value});
    }
  };
}

export function Injectable() {
  return (ctor: Class): void => {
    ensureConstructorParamInjectMetadata(ctor);
  };
}

export function Scope(scope: InjectScope) {
  return (ctor: Constructor): void => {
    setInjectScope(ctor, scope);
  };
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Scope {
  export const SESSION = InjectScope.SESSION;
  export const TRANSIENT = InjectScope.TRANSIENT;
  export const SINGLETON = InjectScope.SINGLETON;
}

export const METADATA_KEY = Symbol();
export type ServiceTypeOf<T extends any[]> = T extends [ServiceId<infer P>, ...infer Q] ? [P, ...ServiceTypeOf<Q>] : [];

export function MiddlewareClass<T extends ServiceId[]>(...serviceIds: T) {
  return <U extends Constructor<Middleware<ServiceTypeOf<T>>>>(constructor: U): U => {
    Reflect.defineMetadata(METADATA_KEY, serviceIds, constructor);
    Injectable()(constructor);
    return constructor;
  };
}

export function getMiddlewareMetadata(constructor: Constructor): ServiceId<CompatMiddleware>[] {
  const metadata = Reflect.getOwnMetadata(METADATA_KEY, constructor);
  if (!Array.isArray(metadata)) {
    throw new Error('missing metadata');
  }
  return metadata;
}
