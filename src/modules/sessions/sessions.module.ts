import { Module } from '@nestjs/common';

import { SessionsController } from './sessions.controller';

import { SessionsService } from './sessions.service';
import { JWTService } from 'src/shared/services/jwt.service';

import { UsersModule } from '../users/users.module';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService, JWTService],
  imports: [UsersModule],
})
export class SessionsModule {}
