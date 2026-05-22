import { Field, Int, ObjectType } from '@nestjs/graphql';

import { MonitorModel } from '../../monitors/models/monitor.model';

@ObjectType()
export class OverviewMetricModel {
  @Field()
  label!: string;

  @Field()
  value!: string;

  @Field()
  detail!: string;
}

@ObjectType()
export class OverviewSnapshotModel {
  @Field()
  workspaceName!: string;

  @Field()
  projectName!: string;

  @Field(() => [OverviewMetricModel])
  metrics!: OverviewMetricModel[];

  @Field(() => [MonitorModel])
  monitors!: MonitorModel[];

  @Field(() => Int)
  productionMonitorCount!: number;
}
