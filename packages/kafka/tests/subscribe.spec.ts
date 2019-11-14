jest.mock('kafka-pipeline', (): unknown => {
  class MockConsumerGroupPipeline {
    private consumingPromise: Promise<unknown> = Promise.resolve();
    private topics: string[] = [];
    private messageConsumer: Function;

    constructor(option: any) {
      this.topics = this.topics.concat(option.topic);
      this.messageConsumer = option.messageConsumer;
      mockController.emit('MockConsumerGroupPipeline:constructor', [option]);
    }

    async close(): Promise<void> {
      await this.consumingPromise;
    }

    async wait(): Promise<void> {
      await this.consumingPromise;
    }

    async start(): Promise<void> {
      this.topics.forEach((topic) => {
        mockController.on(`message:${topic}`, (message) => {
          this.consumingPromise = this.consumingPromise.then(() => {
            return this.messageConsumer(message);
          });
        });
      });
    }
  }

  return {ConsumerGroupPipeline: MockConsumerGroupPipeline};
});
import {Component, Module, ModuleRoot, ParamBinding, RequestInterceptor} from '@sensejs/core';
import {EventEmitter} from 'events';
import {ConsumerGroupPipeline} from 'kafka-pipeline';
import {KafkaConsumerModule} from '../src';
import {ConsumingContext, InjectSubscribeContext, Message} from '../src/consuming-context';
import {SubscribeController, SubscribeTopic} from '../src/consuming-decorators';

const mockController = new EventEmitter();

describe('Subscribe decorators', () => {
  test('Missing param binding', () => {
    expect(() => {
      class Controller {
        @SubscribeTopic('foo')
        foo(value: any) {}
      }
    }).toThrow();
  });

  test('Duplicated @SubscribeTopic', () => {
    expect(() => {
      class Controller {
        @SubscribeTopic('foo')
        @SubscribeTopic('bar')
        foo() {}
      }
    }).toThrow();
  });

  test('Duplicated @SubscribeController', () => {
    expect(() => {
      @SubscribeController()
      @SubscribeController()
      class Controller {}
    }).toThrow();
  });
});

describe('Subscriber', () => {
  test('consume message', async () => {
    const startSpy = jest.spyOn(ConsumerGroupPipeline.prototype, 'start');
    const stopSpy = jest.spyOn(ConsumerGroupPipeline.prototype, 'close');
    const fooSpy = jest.fn();
    const symbolA = Symbol(),
      symbolB = Symbol(),
      symbolC = Symbol();
    const makeInterceptor = (symbol: symbol) => {
      @Component()
      class Interceptor extends RequestInterceptor<ConsumingContext> {
        async intercept(context: ConsumingContext, next: () => Promise<void>): Promise<void> {
          context.bindContextValue(symbol, Math.random());
          await next();
        }
      }

      return Interceptor;
    };
    const interceptorA = makeInterceptor(symbolA),
      interceptorB = makeInterceptor(symbolB),
      interceptorC = makeInterceptor(symbolC);

    @SubscribeController({interceptors: [interceptorB]})
    class Controller {
      @SubscribeTopic('foo', {interceptors: [interceptorC]})
      foo(
        @InjectSubscribeContext() ctx: ConsumingContext,
        @ParamBinding(symbolA) global: any,
        @ParamBinding(symbolB) controller: any,
        @ParamBinding(symbolC) fromTopic: any,
        @Message() message: string | Buffer,
      ) {
        fooSpy();
      }
    }

    const module = KafkaConsumerModule({
      components: [Controller, interceptorA, interceptorB, interceptorC],
      defaultKafkaConsumerOption: {
        kafkaConnectOption: {kafkaHost: 'any', groupId: ''},
      },
      globalInterceptors: [interceptorA],
    });
    const moduleRoot = new ModuleRoot(module);
    await moduleRoot.start();
    expect(startSpy).toBeCalled();
    mockController.emit('message:foo', {topic: ''});
    await moduleRoot.stop();
    expect(fooSpy).toBeCalled();
    expect(stopSpy).toBeCalled();
  });

  test('injected config', async () => {
    const kafkaHost = new Date().toISOString(); // for random string
    const groupId = new Date().toISOString();
    const stub = jest.fn();
    mockController.once('MockConsumerGroupPipeline:constructor', stub);

    @SubscribeController()
    class Controller {
      @SubscribeTopic('foo')
      foo() {}
    }

    const ConfigModule = Module({
      constants: [
        {
          provide: 'config.consumer',
          value: {
            kafkaConnectOption: {
              kafkaHost,
            },
          },
        },
      ],
    });

    class MyKafkaModule extends KafkaConsumerModule({
      components: [Controller],
      requires: [ConfigModule],
      defaultKafkaConsumerOption: {
        kafkaConnectOption: {
          groupId,
        },
      },
      injectOptionFrom: 'config.consumer',
    }) {}

    const moduleRoot = new ModuleRoot(MyKafkaModule);
    await moduleRoot.start().then(() => {
      expect(stub).toHaveBeenCalledWith([
        expect.objectContaining({
          consumerGroupOption: expect.objectContaining({
            kafkaHost,
            groupId,
          }),
        }),
      ]);
    });
  });
});