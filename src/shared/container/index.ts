import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import { ISurveysRepository } from '@modules/surveys/repositories/ISurveysRepository';
import { SurveysRepository } from '@modules/surveys/infra/typeorm/repositories/SurveysRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ISurveysRepository>(
  'SurveysRepository',
  SurveysRepository,
);
