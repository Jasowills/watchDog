import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectModel {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  slug!: string;

  @Field()
  workspaceId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
