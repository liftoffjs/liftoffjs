import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { LiftoffConfig } from '../../common';
import { User } from '../../user';
import { RegisterUserDto } from '../dtos';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: LiftoffConfig,
  ) {}

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
