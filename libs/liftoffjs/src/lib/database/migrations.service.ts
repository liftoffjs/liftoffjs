import { MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MigrationsService {
  private get migrator() {
    return this.orm.getMigrator();
  }

  private get migrationsPath() {
    return `./migrations`;
  }

  constructor(private readonly orm: MikroORM) {}

  async handleCli(processArgv: string[]) {
    if (processArgv.includes('migrations:up')) {
      console.log(`Handling "migrations:up"...`);
      await this.run();
    } else if (processArgv.includes('migrations:generate')) {
      console.log(`Handling "migrations:generate"...`);
      await this.generate();
    }
  }

  async run() {
    await this.migrator.up();
  }

  async generate() {
    await this.migrator.createMigration(this.migrationsPath);
  }
}
