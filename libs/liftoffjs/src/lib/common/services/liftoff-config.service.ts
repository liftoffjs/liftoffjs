import { Connection, IDatabaseDriver } from '@mikro-orm/core';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { HelmetOptions } from 'helmet';
import { isNullOrWhitespace } from '../utils';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as csurf from 'csurf';

export interface Auth {
  passwordHash: string;
  jwtSecret: string;
  jwtExpire: string;
}

export interface Database extends MikroOrmModuleOptions<IDatabaseDriver<Connection>> { }

export interface Email {
  transport: Parameters<typeof createTransport>[0];
  defaults: Parameters<typeof createTransport>[1];
}

@Injectable()
export class LiftoffConfig {
  constructor() { }

  env: string;
  url: string;
  auth: Auth;
  database: Database;
  email: Email;
  clientSettings: Record<string, any>;
  security: {
    helmet: HelmetOptions;
    cors: CorsOptions;
    csrf: Parameters<typeof csurf>[0] & { ignoredRoutePrefixes?: string[] };
  };

  static load(config: Partial<LiftoffConfig>) {
    if (!config) {
      throw new Error(`LiftoffJS could not start: liftoffconfig.json could not be loaded.`);
    }
    const obj = new LiftoffConfig();

    Object.assign(obj, config);

    obj.validate();
    obj.fillDefaults();

    return obj;
  }

  private validate() {
    const errors = [
      ...this.assertStringValue(this.env, 'env'),
      ...this.assertStringValue(this.url, 'url'),
      ...this.assertStringValue(this.auth.jwtExpire, 'auth.jwtExpire'),
      ...this.assertStringValue(this.auth.jwtSecret, 'auth.jwtSecret'),
      ...this.assertStringValue(this.auth.passwordHash, 'auth.passwordHash'),
    ];

    if (errors.length) {
      throw new Error(`LiftoffJS could not start: ${errors.join(', ')}`);
    }
  }

  private fillDefaults() {
    this.security = this.fillAndOverride(this.security, {
      helmet: {},
      cors: {},
      csrf: {},
    });

    this.security.helmet = this.fillAndOverride(this.security.helmet, {});
    this.security.cors = this.fillAndOverride(this.security.cors, {
      origin: this.url,
      credentials: true,
    });
    this.security.csrf = this.fillAndOverride(this.security.csrf, {
      cookie: true,
      ignoredRoutePrefixes: ['/api'],
    });
  }

  private assertStringValue(value: string, key: string) {
    if (isNullOrWhitespace(value)) {
      return [`value is missing: ${key}`];
    }
    return [];
  }

  private fillAndOverride<T>(override: T, defaults: T): T {
    return {
      ...defaults,
      ...(override || {}),
    };
  }
}
