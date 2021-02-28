import { container } from 'tsyringe';

import './providers';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import { ISurveysRepository } from '@modules/surveys/repositories/ISurveysRepository';
import { SurveysRepository } from '@modules/surveys/infra/typeorm/repositories/SurveysRepository';

import { ISurveysUsersRepository } from '@modules/surveys_users/repositories/ISurveysUsersRepository';
import { SurveysUsersRepository } from '@modules/surveys_users/infra/typeorm/repositories/SurveysUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ISurveysRepository>(
  'SurveysRepository',
  SurveysRepository,
);

container.registerSingleton<ISurveysUsersRepository>(
  'SurveysUsersRepository',
  SurveysUsersRepository,
);
