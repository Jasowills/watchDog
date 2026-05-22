import { Module } from '@nestjs/common';

import { DeploymentsController } from './deployments.controller';
import { DeploymentsResolver } from './deployments.resolver';
import { DeploymentsService } from './deployments.service';

@Module({
  controllers: [DeploymentsController],
  providers: [DeploymentsResolver, DeploymentsService],
  exports: [DeploymentsService],
})
export class DeploymentsModule {}
