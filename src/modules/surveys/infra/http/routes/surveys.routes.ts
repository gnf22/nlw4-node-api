import { Router } from 'express';

import { SurveysController } from '../controllers/SurveysController';

export const surveyRouter = Router();

const surveysController = new SurveysController();

surveyRouter.post('/', surveysController.create);
surveyRouter.get('/', surveysController.show);
