import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { JWTService } from 'src/shared/services/jwt.service';
import { IUsersRepository } from '../users/repositories/ports/IUsersRepository';

export interface IAuthenticateResponse {
  token: string;
  user: User;
}

@Injectable()
export class SessionsService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
    private readonly jwtService: JWTService,
  ) {}

  async authenticate(email: string): Promise<IAuthenticateResponse> {
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
