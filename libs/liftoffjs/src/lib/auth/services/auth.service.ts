import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../../email/services';
import { EncryptionService, Guid, LiftoffConfig } from '../../common';
import { User, UserRole, UserService, ViewUserDto } from '../../user';
import { LoginUserDto, RegisterUserDto, ResetPasswordDto } from '../dtos';
import { ResetPasswordEmail } from '../emails';
import { Jwt, JwtPayload } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: LiftoffConfig,
    private readonly jwtService: JwtService,
    private readonly encryptionService: EncryptionService,
    private readonly userService: UserService,
    private readonly emailService: EmailService
  ) {}

  /**
   * @param user The user with the cleartext password to validate
   * @returns The user if successful, null otherwise.
   */
  async login(user: LoginUserDto) {
    const storedUser = await this.userService.findByUsernameOrEmail(user.usernameOrEmail);

    if (!storedUser) {
      return null; // TODO: throw custom exception and catch
    }

    const isCorrectPassword = await this.encryptionService.compare(user.password, storedUser.password);

    if (!isCorrectPassword) {
      return null; // TODO: throw custom exception and catch
    }

    return storedUser;
  }

  async register(user: RegisterUserDto) {
    // TODO: catch unique key exceptions and throw
    const hashedPassword = await this.encryptionService.hash(user.password, null);
    const encryptedUser = new User({
      ...user,
      password: hashedPassword,
    });
    return this.userService.register(encryptedUser);
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

  async initiateResetPasswordWorkflow(usernameOrEmail: string) {
    const user = await this.userService.findByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      return null; // TODO: throw custom exception and catch
    }

    const resetPasswordToken = Guid.newGuid();

    await this.emailService.sendMail({
      to: user.email,
      subject: `Your Reset Password Request`,
      tsx: {
        component: ResetPasswordEmail,
        props: {
          url: `${this.config.url}/auth/reset-password?token=${resetPasswordToken}`,
        },
      },
    });

    return this.userService.update(user, { resetPasswordToken });
  }

  async resetPassword(resetDetails: ResetPasswordDto) {
    const user = await this.userService.findByResetPasswordToken(resetDetails.token);
    if (!user?.resetPasswordToken?.length) {
      return null; // TODO: throw custom exception and catch
    }
    if (user.resetPasswordToken !== resetDetails.token) {
      return null; // TODO: throw custom exception and catch
    }
    const hashedPassword = await this.encryptionService.hash(resetDetails.password, null);
    return this.userService.update(user, { password: hashedPassword });
  }
}
