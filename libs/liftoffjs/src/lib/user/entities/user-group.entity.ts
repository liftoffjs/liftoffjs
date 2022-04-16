import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Transform } from 'class-transformer';
import { Group } from './group.entity';
import { User } from './user.entity';

export const enum UserGroupRole {
  User = 'user',
  Admin = 'admin',
  Owner = 'owner',
}

@Entity()
export class UserGroup {
  @PrimaryKey()
  id: number;

  @ManyToOne({ entity: () => User })
  @Transform(x => {
    if (!x?.value) {
      return null;
    }

    return {
      id: x.value.id
    }
  })
  user!: User;

  @ManyToOne({ entity: () => Group })
  @Transform(x => {
    if (!x?.value) {
      return null;
    }

    return {
      id: x.value.id
    }
  })
  group!: Group;

  @Property({ columnType: 'text', default: UserGroupRole.User })
  role: UserGroupRole;

  constructor(data?: Partial<UserGroup>) {
    Object.assign(this, data ?? {});
  }
}
