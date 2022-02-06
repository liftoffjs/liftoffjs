import { Controller, Get, Req } from '@nestjs/common';
import { ApiAuth } from '../../auth/decorators';
import { UserService } from '../services';
import { ViewUserDto } from '../dtos';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async me(@Req() req) {
    return req.user;
  }

  @Get('')
  @ApiAuth()
  async index() {
    const users = await this.userService.repository.findAll();
    return users.map(u => ViewUserDto.fromEntity(u));
  }
}
