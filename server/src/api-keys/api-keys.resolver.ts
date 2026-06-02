import { Args, Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { ApiKeyModel } from './models/api-key.model';
import { CreateApiKeyInput, RevokeApiKeyInput } from './api-keys.inputs';
import { ApiKeysService } from './api-keys.service';

@ObjectType()
class ApiKeyWithSecret extends ApiKeyModel {
  @Field()
  declare key: string;
}

@Resolver(() => ApiKeyModel)
export class ApiKeysResolver {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Query(() => [ApiKeyModel])
  apiKeys(
    @Args('projectId') projectId: string,
  ): Promise<ApiKeyModel[]> {
    return this.apiKeysService.findAll(projectId);
  }

  @Mutation(() => ApiKeyWithSecret)
  createApiKey(
    @Args('input') input: CreateApiKeyInput,
  ): Promise<ApiKeyModel & { key: string }> {
    return this.apiKeysService.create(input);
  }

  @Mutation(() => ApiKeyModel)
  revokeApiKey(
    @Args('input') input: RevokeApiKeyInput,
  ): Promise<ApiKeyModel> {
    return this.apiKeysService.revoke(input);
  }
}