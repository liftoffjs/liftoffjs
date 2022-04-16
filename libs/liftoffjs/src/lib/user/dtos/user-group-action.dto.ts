import { UserGroupRole } from '../entities';

export class UserGroupActionDto {
  userId: number;
  groupId: number;
  role?: UserGroupRole;
}
