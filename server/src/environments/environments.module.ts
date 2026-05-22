import { Module } from '@nestjs/common';

import { EnvironmentsResolver } from './environments.resolver';
import { EnvironmentsService } from './environments.service';

@Module({
  providers: [EnvironmentsResolver, EnvironmentsService],
  exports: [EnvironmentsService],
})
export class EnvironmentsModule {}
