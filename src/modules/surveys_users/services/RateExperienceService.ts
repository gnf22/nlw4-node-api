import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { SurveyUser } from '../infra/typeorm/entities/SurveyUser';

import { ISurveysUsersRepository } from '../repositories/ISurveysUsersRepository';

interface IRequest {
  u: string;
  value: string;
}

@injectable()
export class RateExperienceService {
  constructor(
    @inject('SurveysUsersRepository')
    private surveysUsersRepository: ISurveysUsersRepository,
  ) {
    /** */
  }

  public async execute({ u, value }: IRequest): Promise<SurveyUser> {
    const survey_user = await this.surveysUsersRepository.findById(u);

    if (!survey_user) {
      throw new AppError('Survey User does not exists!', 404);
    }

    survey_user.value = Number(value);

    await this.surveysUsersRepository.save(survey_user);

    return survey_user;
  }
}
