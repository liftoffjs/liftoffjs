import { EntityRepository, FilterQuery } from '@mikro-orm/core';

export abstract class BaseEntityService<T extends { id: string | number }> {
  constructor(
    readonly repository: EntityRepository<T>,
  ) { }

  async create(entity: T) {
    await this.repository.persistAndFlush(entity);
    return entity;
  }

  findOne(id: T["id"]) {
    const where: FilterQuery<T> = {
      id,
    } as any;

    return this.repository.findOne(where);
  }

  async update(entity: T, entityPartial: Partial<T>, allowedKeys?: Array<keyof T>) {
    Object.keys(entityPartial).forEach((key: any) => {
      if (!allowedKeys || allowedKeys.includes(key)) {
        entity[key] = entityPartial[key];
      }
    });
    await this.repository.persistAndFlush(entity);
    return entity;
  }

  async delete(id: T["id"]) {
    const entity = await this.findOne(id);
    return this.repository.removeAndFlush(entity);
  }
}