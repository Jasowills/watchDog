import { Field, InputType } from '@nestjs/graphql';
import { DeploymentStatus } from './models/deployment.model';

@InputType()
export class RecordDeploymentInput {
  @Field({ nullable: true })
  environmentId?: string;

  @Field({ nullable: true })
  environmentKey?: string;

  @Field({ nullable: true })
  projectKey?: string;

  @Field({ nullable: true })
  serviceId?: string;

  @Field()
  version!: string;

  @Field(() => DeploymentStatus, { nullable: true })
  status?: DeploymentStatus;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  deployedBy?: string;
}
