import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PlatformOverview {
  @Field()
  name!: string;

  @Field()
  stage!: string;

  @Field()
  graphPath!: string;

  @Field()
  checkedAt!: string;

  @Field(() => Float)
  uptimeSeconds!: number;
}
