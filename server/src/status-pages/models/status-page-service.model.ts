import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StatusPageServiceModel {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  displayName: string | null;

  @Field(() => Int)
  sortOrder: number;

  @Field()
  statusPageId: string;

  @Field()
  serviceId: string;
}
