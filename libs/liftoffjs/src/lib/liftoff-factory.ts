import { NestApplicationOptions } from '@nestjs/common';
import { AbstractHttpAdapter, NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { LiftoffConfig } from './common';
import { JsxInterceptor } from './common/viewrendering';

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
    return app;
  }
}
