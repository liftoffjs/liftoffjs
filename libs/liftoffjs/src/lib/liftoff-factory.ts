import { BadRequestException, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { AbstractHttpAdapter, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LiftoffConfig } from './common';
import { JsxInterceptor } from './common/viewrendering';
import * as cookieParser from 'cookie-parser';

export class LiftoffFactory {
  static async create(
    module: any,
    httpAdapterOrOptions?: AbstractHttpAdapter | NestApplicationOptions,
    options?: NestApplicationOptions
  ) {
    const app = options
      ? await NestFactory.create<NestExpressApplication>(
        module,
        httpAdapterOrOptions as AbstractHttpAdapter,
        options
      )
      : await NestFactory.create<NestExpressApplication>(
        module,
        httpAdapterOrOptions as NestApplicationOptions
      );

    app.use(cookieParser(app.get(LiftoffConfig).auth.jwtSecret));

    app.useGlobalInterceptors(new JsxInterceptor());

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: (errors) => {
          throw new BadRequestException(errors);
        }
      }),
    );

    return app;
  }
}
