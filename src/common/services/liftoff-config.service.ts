import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const enum LiftoffConfigKey {
  ENV_NAME = 'ENV_NAME',
  USER_PASSWORD_HASH = 'USER_PASSWORD_HASH',
  JWT_EXPIRE = 'JWT_EXPIRE',
  JWT_SECRET = 'JWT_SECRET',
  DATABASE_TYPE = 'DATABASE_TYPE',
  DATABASE_DB_NAME = 'DATABASE_DB_NAME',
  DATABASE_ENTITIES = 'DATABASE_ENTITIES',
  DATABASE_ENTITIES_TS = 'DATABASE_ENTITIES_TS',
}

@Injectable()
export class LiftoffConfigService {
  constructor(private readonly configService: ConfigService) {}

  getString(key: LiftoffConfigKey | string, defaultValue?: string): string {
    return this.configService.get(key) ?? defaultValue;
  }

  getStringCsv(
    key: LiftoffConfigKey | string,
    defaultValue?: string[],
  ): string[] {
    const values = this.getString(key);
    if (!values) {
      return defaultValue;
    }
    return values.split(',');
  }
}
