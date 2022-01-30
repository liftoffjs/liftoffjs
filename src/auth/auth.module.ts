import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user';
import { CommonModule, LiftoffConfigKey, LiftoffConfigService, registerViewsModule } from '../common';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { JwtStrategy, LocalStrategy } from './stategies';

@Module({
  imports: [
    CommonModule,
    registerViewsModule(__dirname, [AuthController]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [LiftoffConfigService],
      imports: [CommonModule],
      useFactory: ((config: LiftoffConfigService) => {
        return {
          secret: config.getString(LiftoffConfigKey.JWT_SECRET),
          signOptions: {
            expiresIn: config.getString(LiftoffConfigKey.JWT_EXPIRE)
          },
        }
      })
    }),
    UserModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
