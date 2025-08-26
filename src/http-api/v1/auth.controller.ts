import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../../modules/auth/application/auth.service';
import { RegisterDto } from '../../modules/auth/application/dto/register.dto';
import { LoginDto } from '../../modules/auth/application/dto/login.dto';
import { JwtAuthGuard } from '../../modules/auth/infra/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  refresh(@Request() req) {
    return this.authService.refresh(req.user.sub, req.user.role);
  }
}
