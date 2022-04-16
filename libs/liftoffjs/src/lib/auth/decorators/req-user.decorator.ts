import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ViewUserDto } from '../../user';

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest<{ user: ViewUserDto }>()?.user;
  },
);
