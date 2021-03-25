import {Class} from '@sensejs/utility';

export enum BindingType {
  CONSTANT = 'CONSTANT',
  INSTANCE = 'INSTANCE',
  FACTORY = 'FACTORY',
  ASYNC_FACTORY = 'ASYNC_FACTORY',
  ASYNC_PROVIDE = 'ASYNC_PROVIDE',
  ALIAS = 'ALIAS',
}

export type ServiceId<T> = Class<T> | string | symbol;

export enum Scope {
  SINGLETON = 'SINGLETON',
  REQUEST = 'REQUEST',
  TRANSIENT = 'TRANSIENT',
}

export interface ParamInjectionMetadata<T> {
  index: number;
  id: ServiceId<T>;
  optional: boolean;
  transform?: (input: T) => any;
}