import { DynamicModule, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards';
import { CommonModule, LiftoffConfig } from './common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { ClientSettingsController } from './common/controllers';

@Module({})
export class LiftoffModule {
  static forRoot(options: { config: Partial<LiftoffConfig> }): DynamicModule {
    return {
      module: LiftoffModule,
      imports: [
        ServeStaticModule.forRoot({
          rootPath: `${__dirname}/../client`, // join(__dirname, '../..', 'assets'),
          serveRoot: '/client',
          exclude: [`${__dirname}/../client/index.html`],
        }),
        AuthModule,
        CommonModule.forRoot({ config: options.config }),
        DatabaseModule,
        EmailModule,
        UserModule,
      ],
      controllers: [ClientSettingsController],
      providers: [
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
      ],
    };
  }
}
