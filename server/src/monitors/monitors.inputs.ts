import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMonitorInput {
  @Field()
  serviceId!: string;

  @Field()
  environmentId!: string;

  @Field()
  name!: string;

  @Field()
  targetUrl!: string;

  @Field({ nullable: true })
  method?: string;

  @Field(() => Int, { nullable: true })
  expectedStatus?: number;

  @Field({ nullable: true })
  expectedKeyword?: string;

  @Field(() => Int, { nullable: true })
  intervalSeconds?: number;

  @Field(() => Int, { nullable: true })
  timeoutSeconds?: number;
}

@InputType()
export class UpdateMonitorInput {
  @Field()
  id!: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  targetUrl?: string;

  @Field({ nullable: true })
  method?: string;

  @Field(() => Int, { nullable: true })
  expectedStatus?: number;

  @Field({ nullable: true })
  expectedKeyword?: string;

  @Field(() => Int, { nullable: true })
  intervalSeconds?: number;

  @Field(() => Int, { nullable: true })
  timeoutSeconds?: number;

  @Field({ nullable: true })
  isActive?: boolean;
}
