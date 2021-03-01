import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import { SendMailController } from '../controllers/SendMailController';

export const mailRouter = Router();

const sendMailController = new SendMailController();

mailRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      survey_id: Joi.string().uuid().required(),
    },
  }),
  sendMailController.execute,
);
