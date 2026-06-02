import { Query, Resolver } from '@nestjs/graphql';

import { AlertChannelModel } from './models/alert-channel.model';
import { AlertRuleModel } from './models/alert-rule.model';
import { AlertsService } from './alerts.service';

@Resolver()
export class AlertsResolver {
  constructor(private readonly alertsService: AlertsService) {}

  @Query(() => [AlertChannelModel])
  alertChannels(): Promise<AlertChannelModel[]> {
    return this.alertsService.findAllChannels();
  }

  @Query(() => [AlertRuleModel])
  alertRules(): Promise<AlertRuleModel[]> {
    return this.alertsService.findAllRules();
  }
}
