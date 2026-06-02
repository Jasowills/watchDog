import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ErrorGroupModel } from './models/error-group.model';
import { RecordErrorInput } from './errors.inputs';
import { ErrorsService } from './errors.service';

@Resolver(() => ErrorGroupModel)
export class ErrorsResolver {
  constructor(private readonly errorsService: ErrorsService) {}

  @Query(() => [ErrorGroupModel])
  errorGroups(
    @Args('projectSlug', { type: () => String, nullable: true })
    projectSlug?: string,
    @Args('environmentKey', { type: () => String, nullable: true })
    environmentKey?: string,
    @Args('serviceId', { type: () => String, nullable: true })
    serviceId?: string,
    @Args('limit', { type: () => Int, nullable: true })
    limit?: number,
  ): Promise<ErrorGroupModel[]> {
    return this.errorsService.findAll({
      projectSlug,
      environmentKey,
      serviceId,
      limit,
    });
  }

  @Mutation(() => ErrorGroupModel)
  recordError(
    @Args('input') input: RecordErrorInput,
  ): Promise<ErrorGroupModel> {
    return this.errorsService.record(input);
  }
}
