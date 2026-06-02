import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StatusPageModel } from './models/status-page.model';

@Injectable()
export class StatusPagesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<StatusPageModel[]> {
    try {
      const statusPages = await this.prisma.statusPage.findMany();
      return statusPages;
    } catch {
      return [];
    }
  }
}
