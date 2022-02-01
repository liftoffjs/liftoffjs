import * as JwtCookieComboStrategy from 'passport-jwt-cookiecombo';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../interfaces';
import { LiftoffConfig } from '../../common';
import { ViewUserDto } from '../../user';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  JwtCookieComboStrategy,
  'jwt',
) {
  constructor(config: LiftoffConfig) {
    super({
      secretOrPublicKey: config.auth.jwtSecret,
    });
  }

  validate(payload: JwtPayload): ViewUserDto {
    return new ViewUserDto(
      payload.user_id,
      payload.user_username,
      payload.user_email,
      payload.user_role,
    );
  }
}
