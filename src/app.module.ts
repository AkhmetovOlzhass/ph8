import { Module } from '@nestjs/common';
import { HttpApiModule } from './http-api/http-api.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { RedisModule } from './infrastructure/cache/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ContentModule } from './modules/content/content.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpApiModule,
    PrismaModule,
    RedisModule,
    AuthModule,
    UsersModule,
    ContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
