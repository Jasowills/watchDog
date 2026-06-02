import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RecordErrorInput {
  @Field()
  fingerprint!: string;

  @Field()
  message!: string;

  @Field({ nullable: true })
  stack?: string;

  @Field({ nullable: true })
  release?: string;

  @Field({ nullable: true })
  environmentId?: string;

  @Field({ nullable: true })
  environmentKey?: string;

  @Field({ nullable: true })
  serviceId?: string;

  @Field({ nullable: true })
  projectId?: string;

  @Field({ nullable: true })
  projectKey?: string;

  @Field({ nullable: true })
  metadata?: string;
}
