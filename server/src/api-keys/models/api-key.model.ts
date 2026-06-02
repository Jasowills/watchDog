import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApiKeyModel {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  prefix!: string;

  @Field(() => String, { nullable: true })
  lastUsedAt?: Date | null;

  @Field(() => String, { nullable: true })
  expiresAt?: Date | null;

  @Field()
  isRevoked!: boolean;

  @Field()
  createdAt!: Date;

  @Field()
  projectId!: string;
}