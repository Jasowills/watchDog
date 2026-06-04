import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private isConnected = false;

  async onModuleInit(): Promise<void> {
    await this.connect();
  }

  private async connect(): Promise<void> {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await this.$connect();
        this.isConnected = true;
        this.logger.log('Connected to the database.');
        return;
      } catch (err) {
        this.isConnected = false;
        const message = err instanceof Error ? err.message : String(err);
        if (attempt < 3) {
          this.logger.warn(`Database connection attempt ${attempt} failed: ${message}. Retrying...`);
          await new Promise((r) => setTimeout(r, 2000 * attempt));
        } else {
          this.logger.warn(
            'Database unavailable after 3 attempts — queries will fail until a restart. ' +
              `Last error: ${message}`,
          );
        }
      }
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
