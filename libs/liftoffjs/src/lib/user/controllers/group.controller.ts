import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiAuth, ReqUser } from '../../auth/decorators';
import { JsxResult } from '../../common';
import { CreateGroupDto, ViewUserDto, UpdateGroupDto } from '../dtos';
import { Group, UserGroupRole } from '../entities';
import { GroupService, UserGroupService } from '../services';
import { ManageGroupsView, ManageGroupView } from '../views';

@Controller('')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly userGroupService: UserGroupService,
  ) { }

  @Get('group')
  @ApiAuth()
  async manageGroupsView(
    @ReqUser() user: ViewUserDto,
  ) {
    const userGroups = await this.userGroupService.findUserGroups(user.id);
    return new JsxResult(ManageGroupsView, { userGroups });
  }

  @Get('api/group/:id')
  @ApiAuth()
  async findOne(
    @ReqUser() user: ViewUserDto,
    @Param('id') groupId: number,
  ) {
    const userGroup = await this.userGroupService.findUserGroup(user.id, groupId);
    if (!userGroup) {
      throw new Error("User does not have permission to manage groups."); // TODO: Custom error
    }

    return await this.groupService.findOne(groupId, ['userGroups.user']);
  }

  @Get('group/:id')
  @ApiAuth()
  async viewOne(
    @ReqUser() user: ViewUserDto,
    @Param('id') groupId: number,
  ) {
    const userGroup = await this.userGroupService.findUserGroup(user.id, groupId);
    if (!userGroup) {
      throw new Error("User does not have permission to manage groups."); // TODO: Handle unauthed view
    }

    return new JsxResult(ManageGroupView, {
      group: await this.groupService.findOne(groupId, ['userGroups.user'])
    });
  }

  @Post('api/group')
  @ApiAuth()
  async create(
    @ReqUser() user: ViewUserDto,
    @Body() dto: CreateGroupDto,
  ) {
    const group = new Group({ name: dto.name });
    await this.groupService.create(group);
    await this.userGroupService.addUserToGroup(user.id, group.id, UserGroupRole.Owner);

    return group;
  }

  @Put('api/group/:id')
  @ApiAuth()
  async update(
    @ReqUser() user: ViewUserDto,
    @Param('id') groupId: number,
    @Body() dto: UpdateGroupDto,
  ) {
    const userGroup = await this.userGroupService.findUserGroup(user.id, groupId);
    if (!userGroup || userGroup.role !== UserGroupRole.Admin && userGroup.role !== UserGroupRole.Owner) {
      throw new Error("User does not have permission to manage groups."); // TODO: Custom error
    }

    const group = await this.groupService.findOne(groupId);
    return this.groupService.update(group, dto);
  }

  @Delete('api/group/:id')
  @ApiAuth()
  async delete(
    @ReqUser() user: ViewUserDto,
    @Param('id') groupId: number,
  ) {
    const userGroup = await this.userGroupService.findUserGroup(user.id, groupId);
    if (!userGroup || userGroup.role !== UserGroupRole.Admin && userGroup.role !== UserGroupRole.Owner) {
      throw new Error("User does not have permission to manage groups."); // TODO: Custom error
    }

    await this.userGroupService.deleteAll(groupId);
    await this.groupService.delete(groupId);
  }
}
