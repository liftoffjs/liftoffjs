import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '../../user/entities';
import { ROLES_METADATA_KEY } from '../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (requiredRoles?.length && !requiredRoles?.includes(user?.role)) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
