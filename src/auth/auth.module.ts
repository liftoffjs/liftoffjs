import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user';
import { CommonModule, LiftoffConfig, registerViewsModule } from '../common';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { JwtStrategy, LocalStrategy } from './stategies';

@Module({
  imports: [
    CommonModule,
    registerViewsModule(__dirname, [AuthController]),
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
export class AuthModule {}
