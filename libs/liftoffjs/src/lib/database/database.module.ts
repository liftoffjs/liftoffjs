import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CommonModule, LiftoffConfig } from '../common';
import { User } from '../user';
import { MigrationsService } from './migrations.service';

@Module({
  imports: [
    CommonModule,
    MikroOrmModule.forRootAsync({
      inject: [LiftoffConfig],
      imports: [CommonModule],
      useFactory: (config: LiftoffConfig) => {
        const dbConfig = {
          entities: ['./dist/**/*.entity.js'],
          entitiesTs: ['./src/**/*.entity.ts'],
          ...config.database,
        };

        dbConfig.entities = [User];

        return dbConfig;
      },
    }),
  ],
  providers: [MigrationsService],
  exports: [MigrationsService],
})
export class DatabaseModule {}
