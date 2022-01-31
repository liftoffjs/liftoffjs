import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards';
import { registerViewsModule } from '../common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    registerViewsModule(__dirname, [AppController]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'assets'),
      serveRoot: '/assets',
    }),
    AuthModule,
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
