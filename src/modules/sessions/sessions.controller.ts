import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { User } from '.prisma/client';

import { AuthenticateUser } from './dto/authenticate-user.dto';
import { UsersService } from '../users/users.service';
import { JWTService } from 'src/shared/services/jwt.service';

interface IAuthenticateResponde {
  token: string;
  user: User;
}

@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JWTService,
  ) {}

  @Post()
  async authenticate(
    @Body() { email }: AuthenticateUser,
  ): Promise<IAuthenticateResponde> {
    const findUser = await this.usersService.findByEmail(email);

    if (!findUser)
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

    const token = this.jwtService.sign(findUser.id);

    return {
      token,
      user: findUser,
    };
  }
}
