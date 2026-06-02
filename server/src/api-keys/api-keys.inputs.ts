import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateApiKeyInput {
  @Field()
  projectId!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  expiresAt?: string;
}

@InputType()
export class RevokeApiKeyInput {
  @Field()
  id!: string;
}