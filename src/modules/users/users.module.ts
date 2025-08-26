import { Module } from '@nestjs/common';
import { UsersService } from './application/user.service';
import { UsersRepository } from './infra/users.repository';

@Module({
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
