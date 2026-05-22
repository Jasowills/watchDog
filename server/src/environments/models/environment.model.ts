import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EnvironmentModel {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  key!: string;

  @Field(() => String, { nullable: true })
  color?: string | null;

  @Field()
  projectId!: string;
}
