import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';

import { UsersService } from './users.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { JWTService } from 'src/shared/services/jwt.service';

import { UsersRepository } from './repositories/prisma/UsersRepository';

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
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository,
    },
    JWTService,
  ],
  exports: [
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}
