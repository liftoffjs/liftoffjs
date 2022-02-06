import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CommonModule, DatabaseModule } from '../libs/liftoffjs/src';
import { MigrationsService } from '../libs/liftoffjs/src/lib/database/migrations.service';

@Module({
  imports: [
    DatabaseModule,
    CommonModule.forRoot({
      config: require('../apps/server/src/assets/liftoffconfig.json'),
    }),
  ],
})
class MigrationsModule {}

async function bootstrap() {
  const app = await NestFactory.create(MigrationsModule);
  const migrationsService = app.get(MigrationsService);
  await migrationsService.handleCli(process.argv);
  process.exit(0);
}
bootstrap();
