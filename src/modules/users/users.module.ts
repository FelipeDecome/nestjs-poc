import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/shared/services/prisma.service';
import { JWTService } from 'src/shared/services/jwt.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: PrismaService,
      useValue: new PrismaService({
        log: ['query', 'info', 'warn', 'error'],
      }),
    },
    JWTService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
