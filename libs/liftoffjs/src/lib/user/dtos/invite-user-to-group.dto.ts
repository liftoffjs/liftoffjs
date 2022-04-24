import { IsString, IsEnum } from 'class-validator';
import { UserGroupRole } from '../entities';

export class InviteUserToGroupDto {
  @IsString()
  usernameOrEmail: string;

  @IsEnum(UserGroupRole)
  role?: UserGroupRole;
}
