import { Type } from '@nestjs/common';
import { TsxViewsModule } from 'nestjs-tsx-views';
import { resolve } from 'path';

export function registerViewsModule(dirname: string, controllers: Type<any>[]) {
  return TsxViewsModule.register({
    viewsDirectory: resolve(dirname, './views'),
    forRoutes: [...controllers],
  });
}
