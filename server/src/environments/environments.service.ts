import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { mapPrismaError } from '../shared/prisma-errors';
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
      // noop
    }

    return [];
  }

  async create(input: CreateEnvironmentInput): Promise<EnvironmentRecord> {
    try {
      const existing = await this.prisma.environment.findFirst({
        where: { projectId: input.projectId, key: input.key },
      });
      if (existing) {
        throw new ConflictException(
          'An environment with this key already exists in this project.',
        );
      }

      const now = new Date();

      return await this.prisma.environment.create({
        data: {
          projectId: input.projectId,
          name: input.name,
          key: input.key,
          color: input.color,
          createdAt: now,
          updatedAt: now,
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
        data: { name: input.name, color: input.color, updatedAt: new Date() },
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
