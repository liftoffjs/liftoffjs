import { Module } from '@nestjs/common';

import { LiftoffModule } from '@liftoffjs/core';

import environment from './environments/environment';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    LiftoffModule.forRootAsync({
      environment: environment as any,
    }),
    TodoModule
  ],
})
export class AppModule { }
