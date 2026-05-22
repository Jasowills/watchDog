import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { mapPrismaError } from '../shared/prisma-errors';
import { slugify } from '../shared/slugify';
import { fallbackProjects, fallbackServices } from '../shared/fallback-data';
import { ServiceModel } from './models/service.model';
import { CreateServiceInput, UpdateServiceInput } from './services.inputs';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(projectSlug?: string): Promise<ServiceModel[]> {
    try {
      const services = await this.prisma.service.findMany({
        where: projectSlug ? { project: { slug: projectSlug } } : undefined,
        orderBy: { createdAt: 'asc' },
      });

      if (services.length > 0) {
        return services;
      }
    } catch {
      // fall back below
    }

    if (projectSlug && projectSlug !== fallbackProjects[0].slug) {
      return [];
    }

    return fallbackServices;
  }

  async create(input: CreateServiceInput): Promise<ServiceModel> {
    try {
      return await this.prisma.service.create({
        data: {
          projectId: input.projectId,
          name: input.name,
          slug: slugify(input.slug ?? input.name),
          description: input.description,
        },
      });
    } catch (error) {
      mapPrismaError(error);
    }
  }

  async update(input: UpdateServiceInput): Promise<ServiceModel> {
    try {
      return await this.prisma.service.update({
        where: { id: input.id },
        data: { name: input.name, description: input.description },
      });
    } catch (error) {
      mapPrismaError(error);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.service.delete({ where: { id } });
      return true;
    } catch (error) {
      mapPrismaError(error);
    }
  }
}
