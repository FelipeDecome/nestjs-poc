import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UsePipes,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import CreateUserValidation from './validations/create-user.validation';
import FindOneValidation from './validations/find-one.validation';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('ADMIN')
  @UsePipes(CreateUserValidation)
  @UseGuards(AuthGuard, RolesGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const emailInUse = await this.usersService.findByEmail(email);

    if (emailInUse) throw new BadRequestException('Email already in use');

    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UsePipes(FindOneValidation)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const { role } = updateUserDto;

    if (role && !['ADMIN', 'USER'].includes(role))
      throw new BadRequestException(`Role '${role}' does not exist`);

    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    const findUser = await this.usersService.findOne(id);

    if (!findUser) throw new BadRequestException('User not found');

    return this.usersService.remove(id);
  }
}
