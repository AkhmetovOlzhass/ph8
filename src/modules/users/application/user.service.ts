import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../infra/users.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepository) {}

  async getProfile(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getAllUsers() {
    return this.repo.findAll();
  }

  async updateProfile(userId: string, dto: UpdateUserDto) {
    return this.repo.update(userId, dto);
  }
}
