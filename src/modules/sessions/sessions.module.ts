import { Module } from '@nestjs/common';

import { JWTService } from 'src/shared/services/jwt.service';
import { UsersModule } from '../users/users.module';
import { SessionsController } from './sessions.controller';

@Module({
  controllers: [SessionsController],
  providers: [JWTService],
  imports: [UsersModule],
})
export class SessionsModule {}
