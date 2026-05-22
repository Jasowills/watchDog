import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { EnvironmentModel } from './models/environment.model';
import {
  CreateEnvironmentInput,
  UpdateEnvironmentInput,
} from './environments.inputs';
import { EnvironmentsService } from './environments.service';

@Resolver(() => EnvironmentModel)
export class EnvironmentsResolver {
  constructor(private readonly environmentsService: EnvironmentsService) {}

  @Query(() => [EnvironmentModel])
  environments(
    @Args('projectSlug', { type: () => String, nullable: true })
    projectSlug?: string,
  ): Promise<EnvironmentModel[]> {
    return this.environmentsService.findAll(projectSlug);
  }

  @Mutation(() => EnvironmentModel)
  createEnvironment(
    @Args('input') input: CreateEnvironmentInput,
  ): Promise<EnvironmentModel> {
    return this.environmentsService.create(input);
  }

  @Mutation(() => EnvironmentModel)
  updateEnvironment(
    @Args('input') input: UpdateEnvironmentInput,
  ): Promise<EnvironmentModel> {
    return this.environmentsService.update(input);
  }

  @Mutation(() => Boolean)
  deleteEnvironment(@Args('id') id: string): Promise<boolean> {
    return this.environmentsService.remove(id);
  }
}
