import {Inject, InjectLogger, Logger, RequestContext, RequestInterceptor} from '@sensejs/core';
import {EntityManager} from 'typeorm';
import {TransactionEventAnnounceService} from '../../infrastructure/event/transaction-event-announce.service';
import {EventAnnounceService} from '../../infrastructure/event/event-announce.service';

export class TransactionalEventAnnounceInterceptor extends RequestInterceptor {
  constructor(
    @InjectLogger() private logger: Logger,
    @Inject(EventAnnounceService) private eventAnnounceService: EventAnnounceService,
    @Inject(EntityManager) private entityManager: EntityManager,
  ) {
    super();
  }

  async intercept(context: RequestContext, next: () => Promise<void>) {
    const contextualEventAnnounceService = new TransactionEventAnnounceService(this.eventAnnounceService);
    context.bindContextValue(EventAnnounceService, contextualEventAnnounceService);
    await this.entityManager.transaction(async (entityManager) => {
      context.bindContextValue(EntityManager, entityManager);
      EventAnnounceService.map.set(entityManager, contextualEventAnnounceService);
      await next();
    });
    contextualEventAnnounceService.commit();
  }

}