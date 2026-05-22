import { Injectable } from '@nestjs/common';
import { DeploymentStatus, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { mapPrismaError } from '../shared/prisma-errors';
import {
  fallbackDeployments,
  fallbackProjects,
} from '../shared/fallback-data';
import { DeploymentModel } from './models/deployment.model';
import { RecordDeploymentInput } from './deployments.inputs';

/** Minimum shape needed to render a deployment as a flat view model. */
type DeploymentViewSource = {
  id: string;
  version: string;
  status: string;
  description: string | null;
  deployedBy: string | null;
  deployedAt: Date;
  environment: { name: string };
  service: { name: string } | null;
};

type FindParams = {
  environmentKey?: string;
  projectSlug?: string;
  limit?: number;
};

@Injectable()
export class DeploymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: FindParams): Promise<DeploymentModel[]> {
    const limit = params.limit ?? 20;

    try {
      const environmentWhere: Prisma.EnvironmentWhereInput = {};
      if (params.environmentKey) {
        environmentWhere.key = params.environmentKey;
      }
      if (params.projectSlug) {
        environmentWhere.project = { slug: params.projectSlug };
      }

      const deployments = await this.prisma.deployment.findMany({
        where:
          Object.keys(environmentWhere).length > 0
            ? { environment: environmentWhere }
            : {},
        include: { environment: true, service: true },
        orderBy: { deployedAt: 'desc' },
        take: limit,
      });

      if (deployments.length > 0) {
        return deployments.map((deployment) => this.toView(deployment));
      }
    } catch {
      // fall back below
    }

    if (params.projectSlug && params.projectSlug !== fallbackProjects[0].slug) {
      return [];
    }

    return fallbackDeployments
      .filter(
        (deployment) =>
          !params.environmentKey ||
          deployment.environment.key === params.environmentKey,
      )
      .slice(0, limit)
      .map((deployment) => this.toView(deployment));
  }

  async record(input: RecordDeploymentInput): Promise<DeploymentModel> {
    try {
      const deployment = await this.prisma.deployment.create({
        data: {
          environmentId: input.environmentId,
          serviceId: input.serviceId ?? null,
          version: input.version,
          status: this.normalizeStatus(input.status),
          description: input.description,
          deployedBy: input.deployedBy,
        },
        include: { environment: true, service: true },
      });

      return this.toView(deployment);
    } catch (error) {
      mapPrismaError(error);
    }
  }

  private normalizeStatus(status?: string | null): DeploymentStatus {
    const values = Object.values(DeploymentStatus);
    return values.includes(status as DeploymentStatus)
      ? (status as DeploymentStatus)
      : DeploymentStatus.SUCCEEDED;
  }

  private toView(deployment: DeploymentViewSource): DeploymentModel {
    return {
      id: deployment.id,
      version: deployment.version,
      status: this.normalizeStatus(deployment.status),
      description: deployment.description,
      deployedBy: deployment.deployedBy,
      deployedAt: deployment.deployedAt,
      environmentName: deployment.environment.name,
      serviceName: deployment.service?.name ?? null,
    };
  }
}
