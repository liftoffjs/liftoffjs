import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Exclude, Transform } from 'class-transformer';
import { UserGroup } from './user-group.entity';

export const enum UserRole {
  User = 'user',
  Admin = 'admin',
  Owner = 'owner',
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
  @Exclude()
  password: string;

  @Property({ nullable: true })
  @Exclude()
  resetPasswordToken: string;

  @Property({ columnType: 'text', default: UserRole.User })
  role: UserRole;

  @OneToMany(() => UserGroup, userGroup => userGroup.user)
  @Transform(x => {
    if (x.value.getSnapshot) {
      return x.value.getSnapshot();
    }
    return [];
  })
  userGroups = new Collection<UserGroup>(this);

  constructor(data?: Partial<User>) {
    Object.assign(this, data ?? {});
  }
}
