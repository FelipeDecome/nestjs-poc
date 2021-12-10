import { Module } from '@nestjs/common';

import { SessionsController } from './sessions.controller';

import { JWTService } from 'src/shared/services/jwt.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [SessionsController],
  providers: [JWTService],
  imports: [UsersModule],
})
export class SessionsModule {}
