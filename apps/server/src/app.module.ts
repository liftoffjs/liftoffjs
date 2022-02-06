import { Module } from '@nestjs/common';

import { LiftoffModule } from '@liftoffjs/core';

import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    LiftoffModule.forRoot({
      config: require('./assets/liftoffconfig.json'),
    }),
    TodoModule,
  ],
})
export class AppModule {}
