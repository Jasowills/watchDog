import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthenticatedUser } from '../auth/jwt';
import { CurrentUser } from '../auth/current-user.decorator';
import { NotificationModel } from './models/notification.model';
import { NotificationsService } from './notifications.service';

@Resolver(() => NotificationModel)
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Query(() => [NotificationModel])
  notifications(
    @CurrentUser() user: AuthenticatedUser | null,
    @Args('workspaceId', { type: () => String, nullable: true })
    workspaceId?: string,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ): Promise<NotificationModel[]> {
    if (!user) return Promise.resolve([]);
    return this.notificationsService.findAll(user.sub, workspaceId, limit);
  }

  @Query(() => Int)
  unreadNotificationCount(
    @CurrentUser() user: AuthenticatedUser | null,
  ): Promise<number> {
    if (!user) return Promise.resolve(0);
    return this.notificationsService.unreadCount(user.sub);
  }

  @Mutation(() => Boolean)
  markNotificationRead(
    @Args('id') id: string,
  ): Promise<boolean> {
    return this.notificationsService.markRead(id);
  }

  @Mutation(() => Boolean)
  markAllNotificationsRead(
    @CurrentUser() user: AuthenticatedUser | null,
  ): Promise<boolean> {
    if (!user) return Promise.resolve(false);
    return this.notificationsService.markAllRead(user.sub);
  }
}
