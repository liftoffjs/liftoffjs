import { EntityRepository, FilterQuery, FindOptions } from '@mikro-orm/core';

export abstract class BaseEntityService<T extends { id: string | number }> {
  constructor(
    readonly repository: EntityRepository<T>,
  ) { }

  async create(entity: T) {
    await this.repository.persistAndFlush(entity);
    return entity;
  }

  findOne(id: T["id"], populate?: any) {
    const where: FilterQuery<T> = {
      id,
    } as any;

    return this.repository.findOne(where, populate);
  }

  findMany(ids: Array<T["id"]>) {
    const where: FindOptions<T> = {
      id: { $in: ids }
    } as any;

    return this.repository.findAll(where);
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