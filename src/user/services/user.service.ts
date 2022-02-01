import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from '../entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    readonly repository: EntityRepository<User>,
  ) {}

  async register(user: User) {
    user.username = user.username?.toLocaleLowerCase()?.replace(/ /g, '');
    await this.repository.persistAndFlush(user);
    return user;
  }

  findByUsername(username: string) {
    return this.repository.findOne({
      username: username?.toLocaleLowerCase()?.replace(/ /g, ''),
    });
  }
}
