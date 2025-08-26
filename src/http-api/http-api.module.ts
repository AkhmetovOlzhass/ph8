import { Module } from '@nestjs/common';
import { AuthController } from './v1/auth.controller';
import { UsersController } from './v1/users.controller';
import { ContentController } from './v1/content.controller';
import { AuthModule } from '../modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { ContentModule } from 'src/modules/content/content.module';

@Module({
  imports: [AuthModule, UsersModule, ContentModule],
  controllers: [AuthController, UsersController, ContentController],
})
export class HttpApiModule {}
