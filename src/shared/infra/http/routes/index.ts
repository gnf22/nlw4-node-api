import { Router } from 'express';

import { usersRouter } from '@modules/users/infra/http/routes/users.routes';

import { surveyRouter } from '@modules/surveys/infra/http/routes/surveys.routes';

import { mailRouter } from '@modules/surveys_users/infra/http/routes/mail.routes';

export const routes = Router();

routes.use('/users', usersRouter);
routes.use('/surveys', surveyRouter);
routes.use('/send-mail', mailRouter);
