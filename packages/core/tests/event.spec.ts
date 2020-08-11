import {
  createEventSubscriptionModule,
  EventAnnouncer,
  Inject,
  InjectEventAnnouncer,
  ModuleClass,
  ModuleRoot,
  RequestContext,
  RequestInterceptor,
  SubscribeEvent,
  SubscribeEventController,
} from '../src';

describe('Event subscribe and announce', () => {
  test('Subscribe', async () => {
    const spy = jest.fn();
    const spy2 = jest.fn();
    const spy3 = jest.fn();

    class MockInterceptor extends RequestInterceptor {
      intercept(context: RequestContext, next: () => Promise<void>): Promise<void> {
        return next();
      }
    }

    @SubscribeEventController()
    class SubscribeController {
      @SubscribeEvent('event', {filter: (payload: string) => payload === 'bar'})
      bar(@Inject('event') param: string) {
        spy(param);
      }

      @SubscribeEvent('event')
      bar2(@Inject('event') param: string) {
        spy2(param);
      }

      @SubscribeEvent('channel')
      channel(@Inject('a') a: any, @Inject('b') b: any) {
        spy3(a, b);
      }
    }

    @ModuleClass({
      requires: [
        createEventSubscriptionModule({
          interceptors: [MockInterceptor],
          components: [SubscribeController],
        }),
      ],
    })
    class EntryModule {
      async onModuleCreate(
        @InjectEventAnnouncer() announcer: EventAnnouncer,
        @InjectEventAnnouncer('event') eventAnnouncer: (value: any) => void,
      ) {
        await announcer.announceEvent('event', 'foo');
        expect(spy).not.toHaveBeenCalled();
        expect(spy2).toHaveBeenCalledWith('foo');
        await announcer.announceEvent({
          channel: 'event',
          symbol: 'event',
          payload: 'bar',
        });
        await announcer.bind('a', 1).bind('b', 2).announce('channel');
        expect(spy).toHaveBeenCalledWith('bar');
        expect(spy2).toHaveBeenLastCalledWith('bar');
        expect(spy3).toHaveBeenCalledWith(1, 2);
      }
    }

    await ModuleRoot.run(EntryModule, 'onModuleCreate');
  });
});
