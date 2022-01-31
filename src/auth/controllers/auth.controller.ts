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
import { LiftoffConfigService } from 'src/common';
import { RegisterUserDto } from '../dtos';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: LiftoffConfigService,
  ) { }

  @Get('login')
  @Render('login')
  loginView() {
    return {};
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const jwt = this.authService.generateJwt((req as any).user);

    if (req.header('set-cookie')?.[0] === "true") {
      res.cookie('jwt', JSON.stringify(jwt), {
        secure: this.config.getString('ENV_NAME', 'dev') !== 'dev',
        httpOnly: true,
        expires: new Date('2023-01-01'), // TODO: use JWT_EXPIRE
      });
    }

    return jwt;
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
    const jwt = this.authService.generateJwt(user);

    if (req.header('set-cookie')?.[0] === "true") {
      res.cookie('jwt', JSON.stringify(jwt), {
        secure: this.config.getString('ENV_NAME', 'dev') !== 'dev',
        httpOnly: true,
        expires: new Date('2023-01-01'), // TODO: use JWT_EXPIRE
      });
    }

    return jwt;
  }
}
