import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseEntityService } from '../../common/services/base-entity-service';
import { Group } from '../entities';

@Injectable()
export class GroupService extends BaseEntityService<Group> {
  constructor(
    @InjectRepository(Group)
    repository: EntityRepository<Group>,
  ) {
    super(repository);
  }
}
