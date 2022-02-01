import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CommonModule, LiftoffConfig } from '../common';

@Module({
  imports: [
    CommonModule,
    MikroOrmModule.forRootAsync({
      inject: [LiftoffConfig],
      imports: [CommonModule],
      useFactory: (config: LiftoffConfig) => {
        return {
          entities: ['./dist/**/*.entity.js'],
          entitiesTs: ['./src/**/*.entity.ts'],
          ...config.database,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
