import { Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes } from 'node:crypto';

import { PrismaService } from '../prisma/prisma.service';
import { mapPrismaError } from '../shared/prisma-errors';
import { CreateApiKeyInput, RevokeApiKeyInput } from './api-keys.inputs';
import { ApiKeyModel } from './models/api-key.model';

@Injectable()
export class ApiKeysService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(projectId: string): Promise<ApiKeyModel[]> {
    try {
      const keys = await this.prisma.apiKey.findMany({
        where: { projectId },
        orderBy: { createdAt: 'desc' },
      });
      if (keys.length > 0) return keys;
    } catch {
      // noop
    }
    return [];
  }

  async create(
    input: CreateApiKeyInput,
    userId?: string,
  ): Promise<ApiKeyModel & { key: string }> {
    const prefix = `wdp_${randomBytes(4).toString('hex')}`;
    const secret = randomBytes(24).toString('hex');
    const key = `${prefix}_${secret}`;
    const now = new Date();

    try {
      const record = await this.prisma.apiKey.create({
        data: {
          name: input.name,
          key,
          prefix,
          expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
          createdAt: now,
          updatedAt: now,
          projectId: input.projectId,
          createdByUserId: userId ?? null,
        },
      });

      return { ...record, key };
    } catch (error) {
      mapPrismaError(error);
    }
  }

  async revoke(input: RevokeApiKeyInput): Promise<ApiKeyModel> {
    try {
      const existing = await this.prisma.apiKey.findUnique({
        where: { id: input.id },
      });
      if (!existing) {
        throw new NotFoundException('API key not found');
      }

      return await this.prisma.apiKey.update({
        where: { id: input.id },
        data: { isRevoked: true, updatedAt: new Date() },
      });
    } catch (error) {
      mapPrismaError(error);
    }
  }

  async resolve(key: string): Promise<string | null> {
    try {
      const record = await this.prisma.apiKey.findUnique({ where: { key } });
      if (!record || record.isRevoked) return null;
      if (record.expiresAt && record.expiresAt < new Date()) return null;
      return record.projectId;
    } catch {
      return null;
    }
  }
}