import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { PkOnly } from '../../common';
import { Group } from './group.entity';
import { User } from './user.entity';

export enum UserGroupRole {
  User = 'user',
  Admin = 'admin',
  Owner = 'owner',
}

@Entity()
export class UserGroup {
  @PrimaryKey()
  id: number;

  @ManyToOne({ entity: () => User })
  @PkOnly()
  user!: User;

  @ManyToOne({ entity: () => Group })
  @PkOnly()
  group!: Group;

  @Property({ columnType: 'text', default: UserGroupRole.User })
  role: UserGroupRole;

  constructor(data?: Partial<UserGroup>) {
    Object.assign(this, data ?? {});
  }
}
