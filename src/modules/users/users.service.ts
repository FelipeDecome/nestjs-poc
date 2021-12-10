import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { IUsersRepository } from './repositories/ports/IUsersRepository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const emailInUse = await this.usersRepository.findByEmail(email);

    if (emailInUse) throw new BadRequestException('Email already in use');

    return this.usersRepository.create(createUserDto);
  }

  async index() {
    return this.usersRepository.index();
  }

  async findById(id: string) {
    return this.usersRepository.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { role } = updateUserDto;

    if (role && !['ADMIN', 'USER'].includes(role))
      throw new BadRequestException(`Role '${role}' does not exist`);

    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const findUser = await this.usersRepository.findById(id);

    if (!findUser) throw new BadRequestException('User not found');

    return this.usersRepository.delete(id);
  }
}
