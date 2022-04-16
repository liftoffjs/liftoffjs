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

  constructor(private readonly orm: MikroORM) { }

  async handleCli(processArgv: string[]) {
    try {
      if (processArgv.includes('migrations:up')) {
        console.log(`Handling "migrations:up"...`);
        await this.run();
      } else if (processArgv.includes('migrations:generate')) {
        console.log(`Handling "migrations:generate"...`);
        await this.generate();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async run() {
    const results = await this.migrator.up();
    if (!results.length) {
      console.log("No pending migrations found.");
    } else {
      console.log(`Ran ${results.length} new migration(s):`);
      results.forEach(result => {
        console.log(`\t* ${result.path}`);
      });
    }
  }

  async generate() {
    const result = await this.migrator.createMigration(this.migrationsPath);
    console.log(`Wrote migration to ${result.fileName}`);
  }
}
