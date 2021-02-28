import { inject, injectable } from 'tsyringe';

import { Survey } from '../infra/typeorm/entities/Survey';

import { ISurveysRepository } from '../repositories/ISurveysRepository';

@injectable()
export class FindSurveysService {
  constructor(
    @inject('SurveysRepository')
    private surveysRepository: ISurveysRepository,
  ) {
    /** */
  }

  public async execute(): Promise<Survey[]> {
    const surveys = await this.surveysRepository.findAllSurveys();

    return surveys;
  }
}
