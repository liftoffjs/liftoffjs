import { Controller, Get, Req } from '@nestjs/common';
import { ApiAuth, ReqUser } from '../../auth/decorators';
import { UserService } from '../services';
import { ViewUserDto } from '../dtos';
import { UserRole } from '../entities';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('me')
  @ApiAuth()
  async me(@ReqUser() user: ViewUserDto, @Req() req) {
    return user;
  }

  @Get('')
  @ApiAuth(UserRole.Admin, UserRole.Owner)
  async index() {
    const users = await this.userService.repository.findAll();
    return users.map(u => ViewUserDto.fromEntity(u));
  }
}
