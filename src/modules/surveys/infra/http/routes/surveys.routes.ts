import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { SurveysController } from '../controllers/SurveysController';

export const surveyRouter = Router();

const surveysController = new SurveysController();

surveyRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  surveysController.create,
);

surveyRouter.get('/', surveysController.show);
