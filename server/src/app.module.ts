import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AlertsModule } from './alerts/alerts.module';
import { ApiKeysModule } from './api-keys/api-keys.module';
import { AppController } from './app.controller';
import type { Request } from 'express';
import { AuthModule } from './auth/auth.module';
import { extractBearerToken, verifyToken } from './auth/jwt';
import { DeploymentsModule } from './deployments/deployments.module';
import { EnvironmentsModule } from './environments/environments.module';
import { ErrorsModule } from './errors/errors.module';
import { GraphQLModule } from '@nestjs/graphql';
import { IncidentsModule } from './incidents/incidents.module';
import { join } from 'node:path';
import { AppService } from './app.service';
import { MonitorsModule } from './monitors/monitors.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OverviewModule } from './overview/overview.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { ServicesModule } from './services/services.module';
import { StatusPagesModule } from './status-pages/status-pages.module';
import { SystemModule } from './system/system.module';
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req }: { req: Request }) => {
        const token = extractBearerToken(req.headers.authorization);
        const user = token ? verifyToken(token) : null;
        return { user };
      },
    }),
    SystemModule,
    WorkspacesModule,
    ProjectsModule,
    AlertsModule,
    ApiKeysModule,
    EnvironmentsModule,
    IncidentsModule,
    ServicesModule,
    MonitorsModule,
    DeploymentsModule,
    ErrorsModule,
    NotificationsModule,
    OverviewModule,
    StatusPagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
