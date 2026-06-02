import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { AlertChannelModel } from './models/alert-channel.model';
import { AlertRuleModel } from './models/alert-rule.model';

@Injectable()
export class AlertsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllChannels(): Promise<AlertChannelModel[]> {
    try {
      const channels = await this.prisma.alertChannel.findMany();
      return channels;
    } catch {
      return [];
    }
  }

  async findAllRules(): Promise<AlertRuleModel[]> {
    try {
      const rules = await this.prisma.alertRule.findMany();
      return rules;
    } catch {
      return [];
    }
  }
}
