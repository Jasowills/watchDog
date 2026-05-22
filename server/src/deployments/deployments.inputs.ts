import { Field, InputType } from '@nestjs/graphql';
import { DeploymentStatus } from '@prisma/client';

@InputType()
export class RecordDeploymentInput {
  @Field()
  environmentId!: string;

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
