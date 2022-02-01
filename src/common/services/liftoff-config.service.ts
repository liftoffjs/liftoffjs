import { Connection, IDatabaseDriver } from '@mikro-orm/core';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

export interface Auth {
  passwordHash: string;
  jwtSecret: string;
  jwtExpire: string;
}

export interface Database
  extends MikroOrmModuleOptions<IDatabaseDriver<Connection>> {}

export interface Email {
  transport: Parameters<typeof createTransport>[0];
  defaults: Parameters<typeof createTransport>[1];
}

@Injectable()
export class LiftoffConfig {
  constructor() {}

  env: string;
  auth: Auth;
  database: Database;
  email: Email;

  static load(config: Partial<LiftoffConfig>) {
    const obj = new LiftoffConfig();
    Object.assign(obj, config);
    return obj;
  }
}
