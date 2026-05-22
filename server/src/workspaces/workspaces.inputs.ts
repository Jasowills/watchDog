import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateWorkspaceInput {
  @Field()
  name!: string;

  @Field({ nullable: true })
  slug?: string;
}
