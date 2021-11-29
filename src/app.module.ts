import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SessionsModule } from './modules/sessions/sessions.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, SessionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
