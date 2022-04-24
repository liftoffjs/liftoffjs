import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseEntityService } from '../../common';
import { UserGroup, UserGroupRole } from '../entities';
import { GroupService } from './group.service';
import { UserService } from './user.service';

@Injectable()
export class UserGroupService extends BaseEntityService<UserGroup> {
  constructor(
    @InjectRepository(UserGroup)
    repository: EntityRepository<UserGroup>,
    private readonly groupService: GroupService,
    private readonly userService: UserService,
  ) {
    super(repository);
  }

  async findUserGroup(userId: number, groupId: number) {
    const [user, group] = await Promise.all([
      this.userService.findOne(userId),
      this.groupService.findOne(groupId),
    ])

    return this.repository.findOne({ user, group });
  }

  async findUserGroups(userId: number) {
    const user = await this.userService.findOne(userId);
    return this.repository.find({ user }, { populate: ['group'] });
  }

  async addUserToGroup(userId: number, groupId: number, role: UserGroupRole) {
    const [user, group] = await Promise.all([
      this.userService.findOne(userId),
      this.groupService.findOne(groupId),
    ])

    const existingRole = await this.repository.findOne({ user, group });
    if (existingRole) {
      throw new Error("User is already in the group."); // TODO: Custom error
    }

    const userGroup = new UserGroup({
      user,
      group,
      role,
    });

    await this.repository.persistAndFlush(userGroup);

    return userGroup;
  }

  async removeUserFromGroup(userId: number, groupId: number) {
    const userGroup = await this.findUserGroup(userId, groupId);
    await this.repository.nativeDelete(userGroup);
  }

  async deleteAll(groupId: number) {
    const group = await this.groupService.findOne(groupId);
    return this.repository.nativeDelete({ group });
  }
}
