import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { NPSController } from '../controllers/NPSController';

export const npsRouter = Router();

const npsController = new NPSController();

npsRouter.get(
  '/:survey_id',
  celebrate({
    [Segments.PARAMS]: {
      survey_id: Joi.string().uuid().required(),
    },
  }),
  npsController.execute,
);
