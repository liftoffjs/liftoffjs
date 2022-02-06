import { MikroORM } from '@mikro-orm/core';
import { IMigrator } from '@mikro-orm/core/typings';
import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CommonModule, DatabaseModule } from '../libs/liftoffjs/src';
import environment from '../apps/server/src/environments/environment';
import { MigrationsService } from '../libs/liftoffjs/src/lib/database/migrations.service';

@Module({
  imports: [
    DatabaseModule,
    CommonModule.forRootAsync({
      environment
    })
  ]
})
class MigrationsModule { }

async function bootstrap() {
  const app = await NestFactory.create(MigrationsModule);
  const migrationsService = app.get(MigrationsService);
  await migrationsService.handleCli(process.argv);
  process.exit(0);
}
bootstrap();