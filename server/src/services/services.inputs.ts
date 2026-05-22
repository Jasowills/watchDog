import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateServiceInput {
  @Field()
  projectId!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class UpdateServiceInput {
  @Field()
  id!: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}
