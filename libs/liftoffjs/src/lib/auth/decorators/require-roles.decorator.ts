import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../user/entities';
import { ROLES_METADATA_KEY } from '../constants';

export const RequireRoles = (...roles: UserRole[]) =>
  SetMetadata(ROLES_METADATA_KEY, roles);
