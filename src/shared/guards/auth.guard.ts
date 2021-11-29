import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/modules/users/users.service';
import { JWTService } from '../services/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JWTService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;

    if (!authHeader) throw new UnauthorizedException('JWT token is missing');

    const [, token] = authHeader.split(' ');

    try {
      const { sub } = this.jwtService.verify(token);

      const user = await this.usersService.findOne(sub);

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
