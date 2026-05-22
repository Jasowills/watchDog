import { Args, Query, Resolver } from '@nestjs/graphql';

import { OverviewSnapshotModel } from './models/overview.model';
import { OverviewService } from './overview.service';

@Resolver(() => OverviewSnapshotModel)
export class OverviewResolver {
  constructor(private readonly overviewService: OverviewService) {}

  @Query(() => OverviewSnapshotModel)
  overviewSnapshot(
    @Args('workspaceSlug', { type: () => String, nullable: true })
    workspaceSlug?: string,
  ): Promise<OverviewSnapshotModel> {
    return this.overviewService.getSnapshot(workspaceSlug);
  }
}
