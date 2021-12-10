import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { AuthenticateValidation } from './validations/authenticate-validation';

import { IAuthenticateResponse, SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @UsePipes(AuthenticateValidation)
  async authenticate(
    @Body() { email }: AuthenticateUserDto,
  ): Promise<IAuthenticateResponse> {
    return this.sessionsService.authenticate(email);
  }
}
