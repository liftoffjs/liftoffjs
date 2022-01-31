import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';
import { LiftoffConfigKey, LiftoffConfigService } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(app.get(LiftoffConfigService).getString(LiftoffConfigKey.JWT_SECRET)));
  await app.listen(3000);
}

bootstrap();
