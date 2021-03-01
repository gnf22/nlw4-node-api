import { inject, injectable } from 'tsyringe';

import { ISurveysUsersRepository } from '../repositories/ISurveysUsersRepository';

interface IRequest {
  survey_id: string;
}

interface IResponse {
  detractors: number;
  promoters: number;
  passive: number;
  totalAnswers: number;
  nps: number;
}

@injectable()
export class NPSService {
  constructor(
    @inject('SurveysUsersRepository')
    private surveysUsersRepository: ISurveysUsersRepository,
  ) {
    /** */
  }

  public async execute({ survey_id }: IRequest): Promise<IResponse> {
    const surveys_users = await this.surveysUsersRepository.findBySurveyId(
      survey_id,
    );

    const detractors = surveys_users.filter(
      survey => survey.value >= 0 && survey.value <= 6,
    ).length;

    const promoters = surveys_users.filter(survey => survey.value >= 9).length;

    const passive = surveys_users.filter(
      survey => survey.value >= 7 && survey.value <= 8,
    ).length;

    const totalAnswers = surveys_users.length;

    const calculate = Number(
      (((promoters - detractors) / totalAnswers) * 100).toFixed(2),
    );

    const response = {
      detractors,
      promoters,
      passive,
      totalAnswers,
      nps: calculate,
    };

    return response;
  }
}
