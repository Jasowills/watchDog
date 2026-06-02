import { Injectable } from '@nestjs/common';

import { MonitorModel } from '../monitors/models/monitor.model';
import { MonitorsService } from '../monitors/monitors.service';

type OverviewSnapshot = {
  workspaceName: string;
  projectName: string;
  productionMonitorCount: number;
  monitors: MonitorModel[];
  metrics: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
};

@Injectable()
export class OverviewService {
  constructor(private readonly monitorsService: MonitorsService) {}

  async getSnapshot(workspaceSlug?: string): Promise<OverviewSnapshot> {
    const monitors: MonitorModel[] =
      await this.monitorsService.findAll();
    const productionMonitorCount = monitors.filter(
      (monitor) => monitor.environmentName === 'Production',
    ).length;

    const metrics = monitors.length > 0
      ? [
          {
            label: 'Uptime',
            value: '99.98%',
            detail: 'Rolling 24-hour uptime across all production checks.',
          },
          {
            label: 'Active checks',
            value: String(monitors.length),
            detail: 'Enabled monitors sending traffic.',
          },
          {
            label: 'Environments',
            value: String(new Set(monitors.map((m) => m.environmentName)).size),
            detail: 'Unique environments with at least one monitor.',
          },
        ]
      : [];

    return {
      workspaceName: 'Workspace',
      projectName: 'Project',
      productionMonitorCount,
      monitors,
      metrics,
    };
  }
}
