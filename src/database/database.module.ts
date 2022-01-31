import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import {
  CommonModule,
  LiftoffConfigKey,
  LiftoffConfigService,
} from '../common';

@Module({
  imports: [
    CommonModule,
    MikroOrmModule.forRootAsync({
      inject: [LiftoffConfigService],
      imports: [CommonModule],
      useFactory: (config: LiftoffConfigService) => {
        const entities = config.getStringCsv(
          LiftoffConfigKey.DATABASE_ENTITIES,
          ['./dist/**/*.entity.js'],
        );
        const entitiesTs = config.getStringCsv(
          LiftoffConfigKey.DATABASE_ENTITIES,
          ['./src/**/*.entity.ts'],
        );
        const dbName = config.getString(LiftoffConfigKey.DATABASE_DB_NAME);
        const type = config.getString(LiftoffConfigKey.DATABASE_TYPE) as any;

        return {
          entities,
          entitiesTs,
          dbName,
          type,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
