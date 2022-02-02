import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { LiftoffConfig } from '../../common';
import { User } from '../../user';
import { RegisterUserDto, ResetPasswordDto, ResetPasswordRequestDto } from '../dtos';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: LiftoffConfig,
  ) { }

  @Get('login')
  @Render('login')
  loginView() {
    return {};
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.handleJwt(req, res, (req as any).user);
  }

  @Get('register')
  @Render('register')
  registerView() {
    return {};
  }

  @Post('register')
  async register(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterUserDto,
  ) {
    const user = await this.authService.register(dto);
    return this.handleJwt(req, res, user);
  }

  @Get('forgot-password')
  @Render('forgot-password')
  async forgotPasswordView() {
    return {};
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() dto: ResetPasswordRequestDto,
  ) {
    const user = await this.authService.initiateResetPasswordWorkflow(dto.username);
    if (!user) {
      throw new BadRequestException();
    }
  }

  @Get('reset-password')
  @Render('reset-password')
  async resetPasswordView(
    @Query('token') token: string,
  ) {
    return { token };
  }

  @Post('reset-password')
  async resetPassword(
    @Body() dto: ResetPasswordDto,
  ) {
    const user = await this.authService.resetPassword(dto);
    if (!user) {
      throw new BadRequestException();
    }
  }

  private handleJwt(req: Request, res: Response, user: User) {
    const jwt = this.authService.generateJwt(user);

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
