import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ServiceModel } from './models/service.model';
import { CreateServiceInput, UpdateServiceInput } from './services.inputs';
import { ServicesService } from './services.service';

@Resolver(() => ServiceModel)
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Query(() => [ServiceModel])
  services(
    @Args('projectSlug', { type: () => String, nullable: true })
    projectSlug?: string,
  ): Promise<ServiceModel[]> {
    return this.servicesService.findAll(projectSlug);
  }

  @Mutation(() => ServiceModel)
  createService(
    @Args('input') input: CreateServiceInput,
  ): Promise<ServiceModel> {
    return this.servicesService.create(input);
  }

  @Mutation(() => ServiceModel)
  updateService(
    @Args('input') input: UpdateServiceInput,
  ): Promise<ServiceModel> {
    return this.servicesService.update(input);
  }

  @Mutation(() => Boolean)
  deleteService(@Args('id') id: string): Promise<boolean> {
    return this.servicesService.remove(id);
  }
}
