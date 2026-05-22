import { Module } from '@nestjs/common';

import { MonitorsModule } from '../monitors/monitors.module';
import { OverviewResolver } from './overview.resolver';
import { OverviewService } from './overview.service';

@Module({
  imports: [MonitorsModule],
  providers: [OverviewResolver, OverviewService],
})
export class OverviewModule {}
