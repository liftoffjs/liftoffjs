import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Transform } from 'class-transformer';
import { UserGroup } from './user-group.entity';

@Entity()
export class Group {
  @PrimaryKey()
  id: number;

  @Property({ unique: true })
  name: string;

  @OneToMany(() => UserGroup, userGroup => userGroup.group)
  @Transform(x => {
    console.log(x.constructor.name);
    return [];
  })
  userGroups = new Collection<UserGroup>(this);

  constructor(data?: Partial<Group>) {
    Object.assign(this, data ?? {});
  }
}
