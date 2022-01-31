import * as JwtCookieComboStrategy from 'passport-jwt-cookiecombo';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../interfaces';
import { LiftoffConfigKey, LiftoffConfigService } from '../../common';
import { ViewUserDto } from '../../user';

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtCookieComboStrategy, "jwt") {
  constructor(config: LiftoffConfigService) {
    super({
      secretOrPublicKey: config.getString(LiftoffConfigKey.JWT_SECRET),
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
