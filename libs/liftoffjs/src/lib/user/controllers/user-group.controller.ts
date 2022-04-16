import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ApiAuth } from '../../auth/decorators';
import { ReqUser } from '../../auth/decorators/req-user.decorator';
import { UserGroupActionDto, ViewUserDto } from '../dtos';
import { UserGroupRole } from '../entities';
import { UserGroupService } from '../services';

@Controller('')
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) { }

  @Get('api/user/:id/groups')
  @ApiAuth()
  getUserGroups(
    @ReqUser() user: ViewUserDto,
  ) {
    return this.userGroupService.findUserGroups(user.id);
  }

  @Post('api/group/:id/users')
  @ApiAuth()
  async addUserToGroup(
    @ReqUser() user: ViewUserDto,
    @Body() dto: UserGroupActionDto,
  ) {
    const currentUsersGroupData = await this.userGroupService.findUserGroup(user.id, dto.groupId);
    if (currentUsersGroupData?.role !== UserGroupRole.Admin && currentUsersGroupData?.role !== UserGroupRole.Owner) {
      throw new Error("User does not have permission to manage groups."); // TODO: Custom error
    }

    await this.userGroupService.removeUserFromGroup(dto.userId, dto.groupId);
    await this.userGroupService.addUserToGroup(dto.userId, dto.groupId, dto.role ?? UserGroupRole.User);
  }

  @Delete('api/group/:id/users')
  @ApiAuth()
  async removeUserFromGroup(
    @ReqUser() user: ViewUserDto,
    @Body() dto: UserGroupActionDto,
  ) {
    const currentUsersGroupData = await this.userGroupService.findUserGroup(user.id, dto.groupId);
    if (currentUsersGroupData?.role !== UserGroupRole.Admin && currentUsersGroupData?.role !== UserGroupRole.Owner) {
      throw new Error("User does not have permission to manage groups."); // TODO: Custom error
    }

    await this.userGroupService.removeUserFromGroup(dto.userId, dto.groupId);
  }
}
