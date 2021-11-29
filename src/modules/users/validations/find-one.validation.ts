import * as Joi from 'joi';

import { JoiValidationPipe } from 'src/shared/pipes/joi-validation.pipe';

const FindOneValidation = new JoiValidationPipe(Joi.string().uuid());

export default FindOneValidation;
