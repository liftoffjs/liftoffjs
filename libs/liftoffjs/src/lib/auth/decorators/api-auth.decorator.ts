import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '../../user/entities';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RequireRoles } from './require-roles.decorator';

export const ApiAuth = (...roles: UserRole[]) => {
  roles = roles.length ? roles : [UserRole.User, UserRole.Admin, UserRole.Owner];
  return applyDecorators(RequireRoles(roles), UseGuards(JwtAuthGuard));
}
