import { Module } from '@nestjs/common';
import { TsxViewsModule } from 'nestjs-tsx-views';
import { resolve } from 'path';

@Module({
  imports: [
    TsxViewsModule.register({
      viewsDirectory: resolve(__dirname, "../views"),
      prettify: true,
      forRoutes: ["*"],
    }),
  ]
})
export class CoreModule { }
