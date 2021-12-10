import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';

import { JWTService } from '../services/jwt.service';
import { IUsersRepository } from 'src/modules/users/repositories/ports/IUsersRepository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JWTService,
    @Inject('IUsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;

    if (!authHeader) throw new UnauthorizedException('JWT token is missing');

    const [, token] = authHeader.split(' ');

    try {
      const { sub } = this.jwtService.verify(token);

      const user = await this.usersRepository.findById(sub);

      if (!user)
        throw new UnauthorizedException('User assigned to this JWT not found');

      request.user = {
        id: sub,
        role: user.role,
      };
    } catch {
      throw new UnauthorizedException('Invalid JWT token');
    }

    return true;
  }
}
