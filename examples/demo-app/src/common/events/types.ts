import {ConstantProvider, Inject, RequestContext, RequestInterceptor} from '@sensejs/core';
import {Constructor} from '@sensejs/utility';

export interface EventListener {
  close(): void;
}

export interface EventReceiver<T> {
  listen(callback: (messages: T) => Promise<void>): EventListener;
}

export interface EventAnnouncer<T> {
  announce(payload: T): Promise<void>;
}

/**
 * Source of the event
 *
 * Typically instantiate within your domain layer, to ensure events can only be
 * transmitted from related module, only the receiver need be export to external modules
 *
 * @example
 * ```
 * const myEventChannel = somehowCreateMyEventChannel();
 * export topicEventReceiver = topicEventSource.receiver();
 * ```
 */
export abstract class EventChannel<T> {

  abstract readonly symbol: symbol;
  /**
   * The receiver that can listen to this channel
   */
  abstract readonly receiver: EventReceiver<T>;

  /**
   * The transmitter that will broadcast to this channel
   */
  abstract readonly announcer: EventAnnouncer<T>;
}

export function InjectEventTransmitter(channel: EventChannel<unknown>) {
  return Inject(channel.symbol);
}

export function provideEventTransmitter<T>(channel: EventChannel<T>): ConstantProvider<EventAnnouncer<T>> {
  return {
    provide: channel.symbol,
    value: channel.announcer,
  };
}
