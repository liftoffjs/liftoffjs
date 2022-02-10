import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from '../entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    readonly repository: EntityRepository<User>
  ) {}

  async register(user: User) {
    await this.repository.persistAndFlush(user);
    return user;
  }

  async update(user: User, userPartial: Partial<User>) {
    Object.keys(userPartial).forEach(key => (user[key] = userPartial[key]));
    await this.repository.persistAndFlush(user);
    return user;
  }

  findByUsernameOrEmail(usernameOrEmail: string) {
    return this.repository.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
  }

  findByResetPasswordToken(resetPasswordToken: string) {
    return this.repository.findOne({
      resetPasswordToken,
    });
  }
}
