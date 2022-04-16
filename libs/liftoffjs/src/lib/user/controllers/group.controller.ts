import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiAuth } from '../../auth/decorators';
import { ReqUser } from '../../auth/decorators/req-user.decorator';
import { ViewUserDto } from '../dtos';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { UpdateGroupDto } from '../dtos/update-group.dto';
import { Group, UserGroupRole } from '../entities';
import { GroupService, UserGroupService } from '../services';

@Controller('api/group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly userGroupService: UserGroupService,
  ) { }

  @Get(':id')
  @ApiAuth()
  async findOne(
    @ReqUser() user: ViewUserDto,
    @Param('id') groupId: number,
  ) {
    const userGroup = await this.userGroupService.findUserGroup(user.id, groupId);
    const x = await this.userGroupService.repository.findAll();
    console.log({ user, groupId, userGroup, x });
    if (!userGroup) {
      throw new Error("User does not have permission to manage groups."); // TODO: Custom error
    }

    return await this.groupService.findOne(groupId);
  }

  @Post('')
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

  @Put(':id')
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

  @Delete(':id')
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
