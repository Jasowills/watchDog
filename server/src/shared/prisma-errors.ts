import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

/**
 * Translate a Prisma error into a clean client-facing GraphQL error.
 * Re-throws anything it does not recognise.
 */
export function mapPrismaError(error: unknown): never {
  const code = (error as { code?: string }).code;

  if (code === 'P2002') {
    throw new ConflictException(
      'A record with these details already exists in this scope.',
    );
  }

  if (code === 'P2025') {
    throw new NotFoundException('The requested record was not found.');
  }

  if (code === 'P2003') {
    throw new BadRequestException(
      'A referenced record does not exist. Check the linked ids.',
    );
  }

  throw error;
}
