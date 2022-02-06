import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

export const enum UserRole {
  User = 0,
  Admin = 1,
  Owner = 2,
}

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property({ unique: true })
  username: string;

  @Property({ unique: true })
  email: string;

  @Property()
  password: string;

  @Property({ nullable: true })
  resetPasswordToken: string;

  @Property({ default: UserRole.User })
  role: UserRole;

  constructor(data?: Partial<User>) {
    Object.assign(this, data ?? {});
  }
}
