import { Role } from '@prisma/client';

export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public role: Role,
    public createdAt: Date,
  ) {}

  isAdmin(): boolean {
    return this.role === Role.ADMIN;
  }
}
