import { Module } from '@nestjs/common';

import { ApiKeysResolver } from './api-keys.resolver';
import { ApiKeysService } from './api-keys.service';

@Module({
  providers: [ApiKeysResolver, ApiKeysService],
  exports: [ApiKeysService],
})
export class ApiKeysModule {}