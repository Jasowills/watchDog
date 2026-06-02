import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IncidentModel } from './models/incident.model';

@Injectable()
export class IncidentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<IncidentModel[]> {
    try {
      return await this.prisma.incident.findMany();
    } catch {
      return [];
    }
  }
}
