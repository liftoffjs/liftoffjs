import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user';
import { CommonModule, LiftoffConfig } from '../common';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { JwtStrategy, LocalStrategy } from './stategies';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    CommonModule,
    EmailModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [LiftoffConfig],
      imports: [CommonModule],
      useFactory: (config: LiftoffConfig) => {
        return {
          secret: config.auth.jwtSecret,
          signOptions: {
            expiresIn: config.auth.jwtExpire,
          },
        };
      },
    }),
    UserModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
