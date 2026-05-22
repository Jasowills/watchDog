import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { mapPrismaError } from '../shared/prisma-errors';
import { slugify } from '../shared/slugify';
import { fallbackWorkspace } from '../shared/fallback-data';
import { CreateWorkspaceInput } from './workspaces.inputs';

type WorkspaceRecord = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class WorkspacesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<WorkspaceRecord[]> {
    try {
      const workspaces = await this.prisma.workspace.findMany({
        orderBy: { createdAt: 'asc' },
      });

      return workspaces.length > 0 ? workspaces : [fallbackWorkspace];
    } catch {
      return [fallbackWorkspace];
    }
  }

  async create(input: CreateWorkspaceInput): Promise<WorkspaceRecord> {
    try {
      return await this.prisma.workspace.create({
        data: { name: input.name, slug: slugify(input.slug ?? input.name) },
      });
    } catch (error) {
      mapPrismaError(error);
    }
  }
}
