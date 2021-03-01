import { Router } from 'express';

import { usersRouter } from '@modules/users/infra/http/routes/users.routes';

import { surveyRouter } from '@modules/surveys/infra/http/routes/surveys.routes';

import { mailRouter } from '@modules/surveys_users/infra/http/routes/mail.routes';

import { rateRouter } from '@modules/surveys_users/infra/http/routes/rate.routes';

import { npsRouter } from '@modules/surveys_users/infra/http/routes/nps.routes';

export const routes = Router();

routes.use('/users', usersRouter);

routes.use('/surveys', surveyRouter);

routes.use('/send-mail', mailRouter);

routes.use('/answers', rateRouter);

routes.use('/nps', npsRouter);
