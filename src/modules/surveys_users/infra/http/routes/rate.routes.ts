import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import { RateExperienceController } from '../controllers/RateExperienceController';

export const rateRouter = Router();

const rateExperienceController = new RateExperienceController();

rateRouter.get(
  '/:value',
  celebrate({
    [Segments.PARAMS]: {
      value: Joi.string().required(),
    },
    [Segments.QUERY]: {
      u: Joi.string().uuid().required(),
    },
  }),
  rateExperienceController.execute,
);
