import { BadRequestException, Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { LiftoffConfig } from '../../common';
import { JsxResult } from '../../common/viewrendering';
import { User } from '../../user';
import { RegisterUserDto, ResetPasswordDto, ResetPasswordRequestDto } from '../dtos';
import { AuthService } from '../services';
import { ForgotPasswordView, LoginView, RegisterView, ResetPasswordView } from '../views';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly config: LiftoffConfig) { }

  @Get('auth/login')
  loginView() {
    return new JsxResult(LoginView, {});
  }

  @UseGuards(AuthGuard('local'))
  @Post('api/auth/login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.handleJwt(req, res, (req as any).user);
  }

  @Get('auth/register')
  registerView() {
    return new JsxResult(RegisterView, {});
  }

  @Post('api/auth/register')
  async register(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterUserDto
  ) {
    const user = await this.authService.register(dto);
    return this.handleJwt(req, res, user);
  }

  @Get('auth/forgot-password')
  async forgotPasswordView() {
    return new JsxResult(ForgotPasswordView, {});
  }

  @Post('api/auth/forgot-password')
  async forgotPassword(@Body() dto: ResetPasswordRequestDto) {
    const user = await this.authService.initiateResetPasswordWorkflow(dto.usernameOrEmail);
    if (!user) {
      // TODO: handle properly
      throw new BadRequestException();
    }
  }

  @Get('auth/reset-password')
  async resetPasswordView(@Query('token') token: string) {
    return new JsxResult(ResetPasswordView, { token });
  }

  @Post('api/auth/reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const user = await this.authService.resetPassword(dto);
    if (!user) {
      // TODO: handle properly
      throw new BadRequestException();
    }
  }

  private handleJwt(req: Request, res: Response, user: User) {
    const jwt = this.authService.generateJwt(user);

    // TODO: move to service
    if (req.header('set-cookie')?.[0] === 'true') {
      res.cookie('jwt', jwt.access_token, {
        secure: this.config.env !== 'dev',
        httpOnly: true,
        sameSite: true,
        signed: true,
        expires: new Date('2023-01-01'), // TODO: use JWT_EXPIRE
      });
    }

    return jwt;
  }
}
