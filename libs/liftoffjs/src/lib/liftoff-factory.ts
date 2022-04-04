import { BadRequestException, ConsoleLogger, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { AbstractHttpAdapter, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LiftoffConfig } from './common';
import { JsxInterceptor } from './common/viewrendering';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as csurf from 'csurf';
import { Request, Response, NextFunction } from 'express';

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

    const config = app.get(LiftoffConfig);

    app.use(cookieParser(config.auth.jwtSecret));

    app.useGlobalInterceptors(new JsxInterceptor());

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: errors => {
          throw new BadRequestException(errors);
        },
      })
    );

    app.use(helmet(config.security.helmet));
    app.enableCors(config.security.cors);
    app.use((req: Request, res: Response, next: NextFunction) => {
      if (config.security.csrf.ignoredRoutePrefixes.some(p => req.url.startsWith(p))) {
        return next();
      }
      return next();
      // return csurf(config.security.csrf)(req, res, next);
    });

    return app;
  }
}
