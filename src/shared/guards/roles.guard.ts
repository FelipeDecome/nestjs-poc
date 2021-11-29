import { Role } from '.prisma/client';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());

    if (!roles) return true;

    const { user } = context.switchToHttp().getRequest<Request>();

    if (!roles.includes(user.role))
      throw new UnauthorizedException(
        'Insufficient permissions to access this resource',
      );

    return true;
  }
}
