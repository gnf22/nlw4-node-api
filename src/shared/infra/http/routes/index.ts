import { Router } from 'express';

import { usersRouter } from '@modules/users/infra/http/routes/users.routes';

import { surveyRouter } from '@modules/surveys/infra/http/routes/surveys.routes';

export const routes = Router();

routes.use('/users', usersRouter);
routes.use('/surveys', surveyRouter);
