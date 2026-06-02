import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type NotificationRecord = {
  id: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  workspaceId: string;
};

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    userId: string,
    workspaceId?: string,
    limit = 20,
  ): Promise<NotificationRecord[]> {
    try {
      const notifications = await this.prisma.notification.findMany({
        where: { userId, ...(workspaceId ? { workspaceId } : {}) },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });
      return notifications;
    } catch {
      return [];
    }
  }

  async unreadCount(userId: string): Promise<number> {
    try {
      return await this.prisma.notification.count({
        where: { userId, read: false },
      });
    } catch {
      return 0;
    }
  }

  async markRead(id: string): Promise<boolean> {
    try {
      await this.prisma.notification.update({
        where: { id },
        data: { read: true, updatedAt: new Date() },
      });
      return true;
    } catch {
      return false;
    }
  }

  async markAllRead(userId: string): Promise<boolean> {
    try {
      await this.prisma.notification.updateMany({
        where: { userId, read: false },
        data: { read: true, updatedAt: new Date() },
      });
      return true;
    } catch {
      return false;
    }
  }

  async create(data: {
    type: string;
    title: string;
    body?: string;
    link?: string;
    userId: string;
    workspaceId: string;
  }): Promise<NotificationRecord> {
    const now = new Date();
    return this.prisma.notification.create({
      data: {
        type: data.type,
        title: data.title,
        body: data.body ?? null,
        link: data.link ?? null,
        userId: data.userId,
        workspaceId: data.workspaceId,
        createdAt: now,
        updatedAt: now,
      },
    });
  }
}
