import { Injectable } from '@nestjs/common';

import { MonitorModel } from '../monitors/models/monitor.model';
import { MonitorsService } from '../monitors/monitors.service';
import { fallbackProjects, fallbackWorkspace } from '../shared/fallback-data';

type OverviewMonitor = MonitorModel;

type OverviewSnapshot = {
  workspaceName: string;
  projectName: string;
  productionMonitorCount: number;
  monitors: OverviewMonitor[];
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
    const monitors: OverviewMonitor[] = await this.monitorsService.findAll(
      fallbackProjects[0].slug,
    );
    const productionMonitorCount = monitors.filter(
      (monitor: OverviewMonitor) => monitor.environmentName === 'Production',
    ).length;

    return {
      workspaceName:
        workspaceSlug === fallbackWorkspace.slug || !workspaceSlug
          ? fallbackWorkspace.name
          : 'Workspace',
      projectName: fallbackProjects[0].name,
      productionMonitorCount,
      monitors,
      metrics: [
        {
          label: 'Uptime',
          value: '99.98%',
          detail:
            'Measured across the current production fleet in the last 24 hours.',
        },
        {
          label: 'Notifications',
          value: '14',
          detail: 'Slack, email, and webhook deliveries sent today.',
        },
        {
          label: 'Live environments',
          value: '3',
          detail:
            'Production, staging, and sandbox remain visible as separate contexts.',
        },
      ],
    };
  }
}
