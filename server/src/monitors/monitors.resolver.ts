import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { MonitorModel } from './models/monitor.model';
import { CreateMonitorInput, UpdateMonitorInput } from './monitors.inputs';
import { MonitorsService } from './monitors.service';

@Resolver(() => MonitorModel)
export class MonitorsResolver {
  constructor(private readonly monitorsService: MonitorsService) {}

  @Query(() => [MonitorModel])
  monitors(
    @Args('projectSlug', { type: () => String, nullable: true })
    projectSlug?: string,
    @Args('environmentKey', { type: () => String, nullable: true })
    environmentKey?: string,
  ): Promise<MonitorModel[]> {
    return this.monitorsService.findAll(projectSlug, environmentKey);
  }

  @Mutation(() => MonitorModel)
  createMonitor(
    @Args('input') input: CreateMonitorInput,
  ): Promise<MonitorModel> {
    return this.monitorsService.create(input);
  }

  @Mutation(() => MonitorModel)
  updateMonitor(
    @Args('input') input: UpdateMonitorInput,
  ): Promise<MonitorModel> {
    return this.monitorsService.update(input);
  }

  @Mutation(() => Boolean)
  deleteMonitor(@Args('id') id: string): Promise<boolean> {
    return this.monitorsService.remove(id);
  }
}
