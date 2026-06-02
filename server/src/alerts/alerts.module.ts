import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AlertsResolver } from './alerts.resolver';
import { AlertsService } from './alerts.service';

@Module({
  imports: [PrismaModule],
  providers: [AlertsResolver, AlertsService],
  exports: [AlertsService],
})
export class AlertsModule {}
