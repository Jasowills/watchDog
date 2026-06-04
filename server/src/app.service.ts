import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      name: 'Sonar API',
      status: 'ready',
      graphPath: '/graphql',
    };
  }
}
