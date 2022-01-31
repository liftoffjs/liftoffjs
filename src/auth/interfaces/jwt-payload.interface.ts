import { User } from '../../user/entities';

export interface JwtPayload {
  user_id: User['id'];
  user_username: User['username'];
  user_email: User['email'];
  user_role: User['role'];
}
