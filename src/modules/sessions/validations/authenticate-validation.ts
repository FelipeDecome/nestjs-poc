import * as Joi from 'joi';

import { JoiValidationPipe } from 'src/shared/pipes/joi-validation.pipe';

export const AuthenticateValidation = new JoiValidationPipe(
  Joi.object({
    email: Joi.string().email().required(),
  }),
);
