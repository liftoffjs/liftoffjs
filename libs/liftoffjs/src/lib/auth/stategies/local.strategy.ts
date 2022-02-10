import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services';
import { LoginUserDto } from '../dtos';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(usernameOrEmail: string, password: string): Promise<any> {
    return this.authService.login(new LoginUserDto({ usernameOrEmail, password }));
  }
}
