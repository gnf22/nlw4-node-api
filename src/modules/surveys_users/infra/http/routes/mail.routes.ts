import { Router } from 'express';

import { SendMailController } from '../controllers/SendMailController';

export const mailRouter = Router();

const sendMailController = new SendMailController();

mailRouter.post('/', sendMailController.create);
