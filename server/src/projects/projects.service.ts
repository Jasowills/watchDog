import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { mapPrismaError } from '../shared/prisma-errors';
import { slugify } from '../shared/slugify';
import { CreateProjectInput, UpdateProjectInput } from './projects.inputs';

type ProjectRecord = {
  id: string;
  name: string;
  slug: string;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(workspaceSlug?: string): Promise<ProjectRecord[]> {
    try {
      const projects = await this.prisma.project.findMany({
        where: workspaceSlug
          ? { workspace: { slug: workspaceSlug } }
          : undefined,
        orderBy: { createdAt: 'asc' },
      });

      if (projects.length > 0) {
        return projects;
      }
    } catch {
      // noop
    }

    return [];
  }

  async create(input: CreateProjectInput): Promise<ProjectRecord> {
    try {
      const slug = slugify(input.slug ?? input.name);

      const existing = await this.prisma.project.findFirst({
        where: { workspaceId: input.workspaceId, slug },
      });
      if (existing) {
        throw new ConflictException(
          'A project with this slug already exists in this workspace.',
        );
      }

      const now = new Date();

      return await this.prisma.project.create({
        data: {
          workspaceId: input.workspaceId,
          name: input.name,
          slug,
          createdAt: now,
          updatedAt: now,
        },
      });
    } catch (error) {
      mapPrismaError(error);
    }
  }

  async update(input: UpdateProjectInput): Promise<ProjectRecord> {
    try {
      return await this.prisma.project.update({
        where: { id: input.id },
        data: { name: input.name, updatedAt: new Date() },
      });
    } catch (error) {
      mapPrismaError(error);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.project.delete({ where: { id } });
      return true;
    } catch (error) {
      mapPrismaError(error);
    }
  }
}
