import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AlertRuleModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  triggerType: string;

  @Field(() => String, { nullable: true })
  minimumSeverity: string | null;

  @Field()
  isEnabled: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  workspaceId: string;

  @Field(() => String, { nullable: true })
  projectId: string | null;

  @Field(() => String, { nullable: true })
  environmentId: string | null;

  @Field(() => String, { nullable: true })
  serviceId: string | null;

  @Field()
  alertChannelId: string;
}
