import * as Joi from 'joi';

import { JoiValidationPipe } from 'src/shared/pipes/joi-validation.pipe';

const CreateUserValidation = new JoiValidationPipe(
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().custom((value) =>
      ['ADMIN', 'USER', undefined].includes(value),
    ),
  }),
);

export default CreateUserValidation;
