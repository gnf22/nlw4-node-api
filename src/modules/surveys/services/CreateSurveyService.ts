import { inject, injectable } from 'tsyringe';

import { Survey } from '../infra/typeorm/entities/Survey';

import { ISurveysRepository } from '../repositories/ISurveysRepository';

interface IRequest {
  title: string;
  description: string;
}

@injectable()
export class CreateSurveyService {
  constructor(
    @inject('SurveysRepository')
    private surveysRepository: ISurveysRepository,
  ) {
    /** */
  }

  public async execute({ title, description }: IRequest): Promise<Survey> {
    const survey = await this.surveysRepository.create({
      title,
      description,
    });

    return survey;
  }
}
