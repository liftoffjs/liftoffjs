import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseEntityService } from '../../common/services/base-entity-service';
import { User } from '../entities';

@Injectable()
export class UserService extends BaseEntityService<User> {
  constructor(
    @InjectRepository(User)
    repository: EntityRepository<User>
  ) {
    super(repository);
  }

  register(user: User) {
    return this.create(user);
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
