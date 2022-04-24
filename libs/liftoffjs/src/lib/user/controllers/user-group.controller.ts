import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { ApiAuth } from '../../auth/decorators';
import { ReqUser } from '../../auth/decorators/req-user.decorator';
import { UserGroupActionDto, ViewUserDto } from '../dtos';
import { InviteUserToGroupDto } from '../dtos/invite-user-to-group.dto';
import { UserGroupRole } from '../entities';
import { UserGroupService, UserService } from '../services';

@Controller('')
export class UserGroupController {
  constructor(
    private readonly userGroupService: UserGroupService,
    private readonly userService: UserService,
  ) { }

  @Get('api/user/:id/groups')
  @ApiAuth()
  getUserGroups(
    @ReqUser() user: ViewUserDto,
  ) {
    return this.userGroupService.findUserGroups(user.id);
  }

  @Post('api/group/:id/invite')
  @ApiAuth()
  async inviteUserToGroup(
    @ReqUser() user: ViewUserDto,
    @Param('id', ParseIntPipe) groupId: number,
    @Body() dto: InviteUserToGroupDto,
  ) {
    const currentUsersGroupData = await this.userGroupService.findUserGroup(user.id, groupId);
    if (currentUsersGroupData?.role !== UserGroupRole.Admin && currentUsersGroupData?.role !== UserGroupRole.Owner) {
      throw new Error("User does not have permission to manage groups."); // TODO: Custom error
    }
    const invitedUser = await this.userService.findByUsernameOrEmail(dto.usernameOrEmail);
    if (!invitedUser) {
      throw new Error("Invited user could not be found."); // TODO: track invite, send email
    }
    await this.userGroupService.removeUserFromGroup(invitedUser.id, groupId);
    return await this.userGroupService.addUserToGroup(invitedUser.id, groupId, dto.role ?? UserGroupRole.User);
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
    return await this.userGroupService.addUserToGroup(dto.userId, dto.groupId, dto.role ?? UserGroupRole.User);
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

    return {};
  }
}
