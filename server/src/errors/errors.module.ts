import { Module } from '@nestjs/common';

import { ErrorsController } from './errors.controller';
import { ErrorsResolver } from './errors.resolver';
import { ErrorsService } from './errors.service';

@Module({
  controllers: [ErrorsController],
  providers: [ErrorsResolver, ErrorsService],
  exports: [ErrorsService],
})
export class ErrorsModule {}
