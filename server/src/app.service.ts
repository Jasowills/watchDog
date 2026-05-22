import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      name: 'Watchdog API',
      status: 'ready',
      graphPath: '/graphql',
    };
  }
}
