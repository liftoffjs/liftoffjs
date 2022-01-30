import { Body, Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from '../dtos';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('login')
  @Render('login')
  loginView() {
    return { name: 'world' }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    return this.authService.generateJwt(req.user);
  }

  @Get('register')
  @Render('register')
  registerView() {
    return { name: 'world' }
  }

  @Post('register')
  register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }
}
