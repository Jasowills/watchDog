import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { DeploymentModel } from './models/deployment.model';
import { RecordDeploymentInput } from './deployments.inputs';
import { DeploymentsService } from './deployments.service';

@Resolver(() => DeploymentModel)
export class DeploymentsResolver {
  constructor(private readonly deploymentsService: DeploymentsService) {}

  @Query(() => [DeploymentModel])
  deployments(
    @Args('environmentKey', { type: () => String, nullable: true })
    environmentKey?: string,
    @Args('projectSlug', { type: () => String, nullable: true })
    projectSlug?: string,
    @Args('limit', { type: () => Int, nullable: true })
    limit?: number,
  ): Promise<DeploymentModel[]> {
    return this.deploymentsService.findAll({
      environmentKey,
      projectSlug,
      limit,
    });
  }

  @Mutation(() => DeploymentModel)
  recordDeployment(
    @Args('input') input: RecordDeploymentInput,
  ): Promise<DeploymentModel> {
    return this.deploymentsService.record(input);
  }
}
