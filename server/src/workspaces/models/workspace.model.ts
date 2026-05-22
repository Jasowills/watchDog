import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WorkspaceModel {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  slug!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
