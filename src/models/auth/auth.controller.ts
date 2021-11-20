import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRes } from './dto/login-res.dto';
import { UserRes } from './dto/user-res.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req): Promise<UserRes> {
    return await this.authService.getProfile(req.user.user_email);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req): Promise<LoginRes> {
    if (req.user) return await this.authService.login(req.user);
    return;
  }
}
