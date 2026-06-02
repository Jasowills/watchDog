import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { AuthenticatedUser } from './jwt';

type GqlContext = { user: AuthenticatedUser | null };

export const CurrentUser = createParamDecorator(
  (data: keyof AuthenticatedUser | undefined, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext<GqlContext>();

    if (!user) return null;
    if (data) return user[data];
    return user;
  },
);
