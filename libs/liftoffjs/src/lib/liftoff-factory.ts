import { BadRequestException, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CommonModule } from './common';
import { JsxInterceptor } from './common/viewrendering';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';
import { createLiftoffLogger } from './utils';


export class LiftoffFactory {
  static async create(
    module: any,
    options?: NestApplicationOptions
  ) {
    if (!options) {
      options = {};
    }

    const config = CommonModule.config;

    options.logger = createLiftoffLogger(config);

    const app = await NestFactory.create<NestExpressApplication>(
      module,
      options
    );

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
