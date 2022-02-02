import { MikroORM } from '@mikro-orm/core';
import { IMigrator } from '@mikro-orm/core/typings';
import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DatabaseModule } from '../src/database/database.module';
import * as readline from 'readline';
import * as rimraf from 'rimraf';

@Module({
  imports: [DatabaseModule]
})
class MigrationsModule { }

async function run(migrator: IMigrator) {
  await migrator.up();
  console.log('Migration complete.');
}

async function generate(migrator: IMigrator) {
  await migrator.createMigration('./migrations');
  console.log('Migration generated.');
}

async function rebuild(migrator: IMigrator) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question("Are you sure you want to rebuild migrations? (yes/no) ", async ans => {
    if (ans === "yes") {
      await new Promise(resolve => rimraf('../migrations', resolve));
      await new Promise(resolve => rimraf('../data', resolve));
      await migrator.createMigration('./migrations');
      await migrator.up();
    }
    rl.close();
    console.log('Migrations rebuilded.');
    resolve(null);
  }));
}

async function bootstrap() {
  const app = await NestFactory.create(MigrationsModule, { logger: false });
  const migrator = app.get(MikroORM).getMigrator();

  const commands = {
    run,
    generate,
    rebuild
  };

  const command: keyof typeof commands = process.argv[2] as any;

  await commands[command](migrator);

  process.exit(0);
}
bootstrap();
