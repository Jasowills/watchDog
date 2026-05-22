import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { DeploymentStatus } from '@prisma/client';

registerEnumType(DeploymentStatus, {
  name: 'DeploymentStatus',
  description: 'Lifecycle state of a recorded deployment.',
});

@ObjectType()
export class DeploymentModel {
  @Field()
  id!: string;

  @Field()
  version!: string;

  @Field(() => DeploymentStatus)
  status!: DeploymentStatus;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String, { nullable: true })
  deployedBy?: string | null;

  @Field()
  deployedAt!: Date;

  @Field()
  environmentName!: string;

  @Field(() => String, { nullable: true })
  serviceName?: string | null;
}
