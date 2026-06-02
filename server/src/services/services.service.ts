import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { mapPrismaError } from '../shared/prisma-errors';
import { slugify } from '../shared/slugify';
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
      // noop
    }

    return [];
  }

  async create(input: CreateServiceInput): Promise<ServiceModel> {
    try {
      const slug = slugify(input.slug ?? input.name);

      const existing = await this.prisma.service.findFirst({
        where: { projectId: input.projectId, slug },
      });
      if (existing) {
        throw new ConflictException(
          'A service with this slug already exists in this project.',
        );
      }

      const now = new Date();

      return await this.prisma.service.create({
        data: {
          projectId: input.projectId,
          name: input.name,
          slug,
          description: input.description,
          createdAt: now,
          updatedAt: now,
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
        data: {
          name: input.name,
          description: input.description,
          updatedAt: new Date(),
        },
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
