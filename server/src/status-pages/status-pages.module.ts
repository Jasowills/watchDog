import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StatusPagesResolver } from './status-pages.resolver';
import { StatusPagesService } from './status-pages.service';

@Module({
  imports: [PrismaModule],
  providers: [StatusPagesResolver, StatusPagesService],
  exports: [StatusPagesService],
})
export class StatusPagesModule {}
