import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from '../../modules/users/application/user.service';
import { JwtAuthGuard } from '../../modules/auth/infra/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UpdateUserDto } from '../../modules/users/application/dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.usersService.getProfile(req.user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateProfile(@Request() req, @Body() dto: UpdateUserDto) {
    return this.usersService.updateProfile(req.user.sub, dto);
  }
}
