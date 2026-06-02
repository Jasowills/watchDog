import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEnvironmentInput {
  @Field()
  projectId!: string;

  @Field()
  name!: string;

  @Field()
  key!: string;

  @Field({ nullable: true })
  color?: string;
}

@InputType()
export class UpdateEnvironmentInput {
  @Field()
  id!: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  color?: string;
}
