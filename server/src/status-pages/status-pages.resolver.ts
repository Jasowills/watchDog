import { Query, Resolver } from '@nestjs/graphql';

import { StatusPageModel } from './models/status-page.model';
import { StatusPagesService } from './status-pages.service';

@Resolver(() => StatusPageModel)
export class StatusPagesResolver {
  constructor(private readonly statusPagesService: StatusPagesService) {}

  @Query(() => [StatusPageModel])
  statusPages(): Promise<StatusPageModel[]> {
    return this.statusPagesService.findAll();
  }
}
