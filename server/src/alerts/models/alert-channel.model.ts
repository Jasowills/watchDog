import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AlertChannelModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  destination: string;

  @Field(() => String, { nullable: true })
  secretRef: string | null;

  @Field()
  isEnabled: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  workspaceId: string;

  @Field(() => String, { nullable: true })
  creatorUserId: string | null;
}
