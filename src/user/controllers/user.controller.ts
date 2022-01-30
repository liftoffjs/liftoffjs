import { Controller, Get } from '@nestjs/common';
import { ApiAuth } from '../../auth/decorators';
import { UserService } from '../services';
import { ViewUserDto } from '../dtos';
import { UserRole } from '../entities';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Get('')
  @ApiAuth(UserRole.Admin)
  async index() {
    const users = await this.userService.repository.findAll();
    return users.map(u => ViewUserDto.fromEntity(u));
  }
}
