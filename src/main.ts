import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';
import { LiftoffConfig } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(app.get(LiftoffConfig).auth.jwtSecret));
  await app.listen(3000);
}

bootstrap();
