import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from '../../common';
import { User, UserRole, UserService, ViewUserDto } from '../../user';
import { LoginUserDto, RegisterUserDto } from '../dtos';
import { Jwt, JwtPayload } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly encryptionService: EncryptionService,
    private readonly userService: UserService,
  ) {}

  async register(user: RegisterUserDto) {
    const salt = await this.encryptionService.generateSalt();
    const hashedPassword = await this.encryptionService.hash(
      user.password,
      salt,
    );
    const encryptedUser = new User({
      ...user,
      password: hashedPassword,
    });
    return this.userService.register(encryptedUser);
  }

  /**
   * @param user The user with the cleartext password to validate
   * @returns The user if successful, null otherwise.
   */
  async login(user: LoginUserDto) {
    const storedUser = await this.userService.findByUsername(user.username);

    if (!storedUser) {
      return null;
    }

    const isCorrectPassword = await this.encryptionService.compare(
      user.password,
      storedUser.password,
    );

    if (!isCorrectPassword) {
      return null;
    }

    return storedUser;
  }

  generateJwt(user: User): Jwt {
    const payload: JwtPayload = {
      user_id: user.id,
      user_username: user.username,
      user_email: user.email,
      user_role: user.role ?? UserRole.User,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
