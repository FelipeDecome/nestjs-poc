import { Prisma, Role } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  id?: string;
  email: string;
  name: string;
  role?: Role;
  createdAt?: Date;
  updatedAt?: Date;
}
