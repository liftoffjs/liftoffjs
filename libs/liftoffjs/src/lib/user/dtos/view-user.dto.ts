import { User, UserRole } from '../entities';

export class ViewUserDto {
  constructor(
    readonly id: number,
    readonly username: string,
    readonly email: string,
    readonly role: UserRole,
  ) {}

  static fromEntity(user: User) {
    return new ViewUserDto(user.id, user.username, user.email, user.role);
  }
}
