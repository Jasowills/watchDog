import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { DeploymentsModule } from './deployments/deployments.module';
import { EnvironmentsModule } from './environments/environments.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { AppService } from './app.service';
import { MonitorsModule } from './monitors/monitors.module';
import { OverviewModule } from './overview/overview.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { ServicesModule } from './services/services.module';
import { SystemModule } from './system/system.module';
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    SystemModule,
    WorkspacesModule,
    ProjectsModule,
    EnvironmentsModule,
    ServicesModule,
    MonitorsModule,
    DeploymentsModule,
    OverviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
