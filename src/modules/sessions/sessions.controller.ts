import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';

import { User } from '.prisma/client';

import { AuthenticateUser } from './dto/authenticate-user.dto';
import { JWTService } from 'src/shared/services/jwt.service';
import { IUsersRepository } from '../users/repositories/ports/IUsersRepository';

interface IAuthenticateResponde {
  token: string;
  user: User;
}

@Controller('sessions')
export class SessionsController {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
    private readonly jwtService: JWTService,
  ) {}

  @Post()
  async authenticate(
    @Body() { email }: AuthenticateUser,
  ): Promise<IAuthenticateResponde> {
    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser)
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

    const token = this.jwtService.sign(findUser.id);

    return {
      token,
      user: findUser,
    };
  }
}
