import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { SurveyUser } from '../infra/typeorm/entities/SurveyUser';

import { ISurveysUsersRepository } from '../repositories/ISurveysUsersRepository';

interface IRequest {
  u: string;
  value: number;
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
    const surveyUser = await this.surveysUsersRepository.findById(u);

    if (!surveyUser) {
      throw new AppError('Survey User does not exists!', 404);
    }

    surveyUser.value = value;

    await this.surveysUsersRepository.save(surveyUser);

    return surveyUser;
  }
}
