import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field()
  workspaceId!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  slug?: string;
}

@InputType()
export class UpdateProjectInput {
  @Field()
  id!: string;

  @Field({ nullable: true })
  name?: string;
}
