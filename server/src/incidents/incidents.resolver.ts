import { Query, Resolver } from '@nestjs/graphql';

import { IncidentModel } from './models/incident.model';
import { IncidentsService } from './incidents.service';

@Resolver(() => IncidentModel)
export class IncidentsResolver {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Query(() => [IncidentModel])
  incidents(): Promise<IncidentModel[]> {
    return this.incidentsService.findAll();
  }
}
