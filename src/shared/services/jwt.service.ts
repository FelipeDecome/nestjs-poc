import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

import authConfig from 'src/config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

@Injectable()
export class JWTService {
  sign(subject: string): string {
    return sign({}, authConfig.jwt.secret, {
      subject,
      expiresIn: authConfig.jwt.expiresIn,
    });
  }

  verify(token: string): ITokenPayload {
    const decoded = verify(token, authConfig.jwt.secret);

    return decoded as ITokenPayload;
  }
}
