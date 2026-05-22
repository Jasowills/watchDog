import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { mapPrismaError } from '../shared/prisma-errors';
import { slugify } from '../shared/slugify';
import {
  fallbackEnvironments,
  fallbackProjects,
} from '../shared/fallback-data';
import {
  CreateEnvironmentInput,
  UpdateEnvironmentInput,
} from './environments.inputs';

type EnvironmentRecord = {
  id: string;
  name: string;
  key: string;
  color: string | null;
  projectId: string;
};

@Injectable()
export class EnvironmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(projectSlug?: string): Promise<EnvironmentRecord[]> {
    try {
      const environments = await this.prisma.environment.findMany({
        where: projectSlug ? { project: { slug: projectSlug } } : undefined,
        orderBy: { createdAt: 'asc' },
      });

      if (environments.length > 0) {
        return environments;
      }
    } catch {
      // fall back below
    }

    if (projectSlug && projectSlug !== fallbackProjects[0].slug) {
      return [];
    }

    return fallbackEnvironments;
  }

  async create(input: CreateEnvironmentInput): Promise<EnvironmentRecord> {
    try {
      return await this.prisma.environment.create({
        data: {
          projectId: input.projectId,
          name: input.name,
          key: slugify(input.key ?? input.name),
          color: input.color,
        },
      });
    } catch (error) {
      mapPrismaError(error);
    }
  }

  async update(input: UpdateEnvironmentInput): Promise<EnvironmentRecord> {
    try {
      return await this.prisma.environment.update({
        where: { id: input.id },
        data: { name: input.name, color: input.color },
      });
    } catch (error) {
      mapPrismaError(error);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.environment.delete({ where: { id } });
      return true;
    } catch (error) {
      mapPrismaError(error);
    }
  }
}
