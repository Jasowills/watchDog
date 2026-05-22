import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceModel {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  slug!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field()
  projectId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
