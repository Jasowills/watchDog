import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NotificationModel {
  @Field(() => ID)
  id: string;

  @Field()
  type: string;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  body: string | null;

  @Field(() => String, { nullable: true })
  link: string | null;

  @Field()
  read: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  userId: string;

  @Field()
  workspaceId: string;
}
