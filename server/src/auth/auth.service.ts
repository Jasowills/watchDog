import { Injectable, Logger } from '@nestjs/common';
import { AuthenticatedUser, extractBearerToken, verifyToken } from './jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor() {
    if (!process.env.JWT_SECRET) {
      this.logger.warn(
        'JWT_SECRET is not set — authentication tokens will not be verified.',
      );
    }
  }

  authenticateRequest(authorization?: string): AuthenticatedUser | null {
    const token = extractBearerToken(authorization);
    if (!token) return null;
    return verifyToken(token);
  }
}
