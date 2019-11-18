import {Container, inject, injectable} from 'inversify';
import {composeRequestInterceptor, RequestContext, RequestInterceptor, ServiceIdentifier} from '../src';

const FOO_SYMBOL = Symbol('FOO_SYMBOL'),
  BAR_SYMBOL = Symbol('BAR_SYMBOL');

class FooInterceptor extends RequestInterceptor {
  async intercept(context: RequestContext, next: () => Promise<void>) {
    context.bindContextValue(FOO_SYMBOL, Math.random());
    await next();
  }
}

class BarInterceptor extends RequestInterceptor {
  async intercept(context: RequestContext, next: () => Promise<void>) {
    context.bindContextValue(BAR_SYMBOL, Math.random());
    await next();
  }
}

class MockRequestContext extends RequestContext {
  constructor(private container: Container) {
    super();
  }

  bindContextValue<T>(key: ServiceIdentifier<T>, value: T): void {
    this.container.bind(key).toConstantValue(value);
  }
}

describe('Interceptor', () => {
  const container = new Container();
  container.bind(FooInterceptor).toSelf();
  container.bind(BarInterceptor).toSelf();

  function prepareRequestContext() {
    const childContainer = container.createChild();
    childContainer.bind(Container).toConstantValue(childContainer);
    const context = new MockRequestContext(childContainer);
    return {childContainer, context};
  }

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('empty', async () => {
    const {childContainer, context: ctx} = prepareRequestContext();
    const emptyInterceptor = composeRequestInterceptor(container, []);
    await childContainer.get(emptyInterceptor).intercept(ctx, () => Promise.resolve());
  });
  test('single', async () => {
    const {childContainer, context: ctx} = prepareRequestContext();
    const fooSpy = jest.spyOn(FooInterceptor.prototype, 'intercept');
    const singleInterceptor = composeRequestInterceptor(container, [FooInterceptor]);
    await childContainer.get(singleInterceptor).intercept(ctx, async () => {
      expect(container.isBound(FOO_SYMBOL));
    });
    expect(fooSpy).toHaveBeenLastCalledWith(ctx, expect.any(Function));
  });

  test('multiple', async () => {
    const {childContainer, context} = prepareRequestContext();
    const fooSpy = jest.spyOn(FooInterceptor.prototype, 'intercept');
    const barSpy = jest.spyOn(FooInterceptor.prototype, 'intercept');
    const result = composeRequestInterceptor(container, [FooInterceptor, BarInterceptor]);

    await childContainer.get(result).intercept(context, async () => {
      expect(container.isBound(FOO_SYMBOL));
      expect(container.isBound(BAR_SYMBOL));
    });
    expect(fooSpy).toHaveBeenLastCalledWith(context, expect.any(Function));
    expect(barSpy).toHaveBeenLastCalledWith(context, expect.any(Function));
  });

  test('error occurred', async () => {
    const {childContainer, context} = prepareRequestContext();

    class MyError extends Error {}

    class BadInterceptor extends RequestInterceptor {
      async intercept(context: RequestContext, next: () => Promise<void>) {
        throw new MyError();
      }
    }

    container.bind(BadInterceptor).toSelf();
    const fooSpy = jest.spyOn(FooInterceptor.prototype, 'intercept');
    const result = composeRequestInterceptor(container, [BadInterceptor, FooInterceptor]);

    await expect(childContainer.get(result).intercept(context, () => Promise.resolve())).rejects.toEqual(
      expect.any(MyError),
    );
    expect(fooSpy).not.toHaveBeenCalled();
  });

  test('Interceptor can inject symbol from prior interceptor', async () => {
    const {childContainer, context} = prepareRequestContext();
    const spy = jest.fn();

    @injectable()
    class InjectArgsInterceptor extends RequestInterceptor {
      constructor(@inject(FOO_SYMBOL) private value: any) {
        super();
      }

      async intercept(context: RequestContext, next: () => Promise<void>) {
        spy(this.value);
        return next();
      }
    }

    container.bind(InjectArgsInterceptor).toSelf();
    const result = composeRequestInterceptor(container, [FooInterceptor, BarInterceptor, InjectArgsInterceptor]);
    await childContainer.get(result).intercept(context, () => Promise.resolve());
    expect(spy).toHaveBeenCalledWith(expect.any(Number));
  });

  test('Interceptor should fail to call to next multiple times', async () => {
    const {childContainer, context} = prepareRequestContext();

    class BadInterceptor extends RequestInterceptor {
      async intercept(context: RequestContext, next: () => Promise<void>) {
        await next();
        await next();
      }
    }

    container.bind(BadInterceptor).toSelf();
    const barSpy = jest.spyOn(BarInterceptor.prototype, 'intercept');
    const result = composeRequestInterceptor(container, [FooInterceptor, BadInterceptor, BarInterceptor]);

    await expect(childContainer.get(result).intercept(context, () => Promise.resolve())).rejects.toEqual(
      expect.any(Error),
    );
    expect(barSpy).toHaveBeenCalledTimes(1);
  });
});
