import { IsEnum, IsNumber, IsString } from 'class-validator';
import { UserGroupRole } from '../entities';

export class UserGroupActionDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  groupId: number;

  @IsEnum(UserGroupRole)
  role?: UserGroupRole;
}
