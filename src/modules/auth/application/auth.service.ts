import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Prisma, Role } from '@prisma/client';
import { TokensDto } from './dto/token.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import jwtConfig from '../../../config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: { email: dto.email, password: hash, role: Role.USER },
      });
      return this.generateTokens(user.id, user.role);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('User with this email already exists');
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return this.generateTokens(user.id, user.role);
  }

  async refreshTokens(refreshToken: string): Promise<TokensDto> {
    const jwtCfg = this.configService.get<ConfigType<typeof jwtConfig>>('jwt')!;

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: jwtCfg.refreshSecret,
      });

      return this.generateTokens(payload.sub, payload.role);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private generateTokens(userId: string, role: string): TokensDto {
    const jwtCfg = this.configService.get<ConfigType<typeof jwtConfig>>('jwt')!;
    const payload = { sub: userId, role };

    const accessToken = this.jwtService.sign(payload, {
      secret: jwtCfg.secret,
      expiresIn: jwtCfg.expiresIn,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtCfg.refreshSecret,
      expiresIn: jwtCfg.refreshIn,
    });

    return { accessToken, refreshToken };
  }
}
