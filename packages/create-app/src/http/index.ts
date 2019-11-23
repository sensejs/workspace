import {Logger, InjectLogger} from '@sensejs/core';
import {HttpModule} from '@sensejs/http';
import {ExampleController} from './example.controller';
import {RequestTimingInterceptor} from './request-timing.interceptor';
import PublishingModule from '../example';
import {TracingInterceptor} from './tracing-interceptor';
import {TypeOrmSupportInterceptor} from '@sensejs/typeorm';

export default class ExampleHttpModule extends HttpModule({
  httpOption: {
    listenPort: 3000,
    listenAddress: '0.0.0.0',
  },
  requires: [PublishingModule],
  components: [ExampleController, TracingInterceptor, RequestTimingInterceptor],
  globalInterceptors: [TypeOrmSupportInterceptor, TracingInterceptor, RequestTimingInterceptor],
  injectOptionFrom: 'config.http',
}) {
  constructor(@InjectLogger(ExampleHttpModule) private logger: Logger) {
    super();
  }

  async onCreate() {
    this.logger.info('Creating HTTP Module');
    await super.onCreate();
    this.logger.info('Created HTTP Module');
  }

  async onDestroy() {
    this.logger.info('Destroying HTTP Module');
    await super.onDestroy();
    this.logger.info('Destroyed Example Module');
  }
}
