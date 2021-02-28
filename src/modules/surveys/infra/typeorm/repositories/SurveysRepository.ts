import { getRepository, Repository } from 'typeorm';

import { ISurveysRepository } from '@modules/surveys/repositories/ISurveysRepository';
import { ICreateSurveyDTO } from '@modules/surveys/dtos/ICreateSurveyDTO';

import { Survey } from '../entities/Survey';

export class SurveysRepository implements ISurveysRepository {
  private ormRepository: Repository<Survey>;

  constructor() {
    this.ormRepository = getRepository(Survey);
  }

  public async findAllSurveys(): Promise<Survey[]> {
    const surveys = this.ormRepository.find();

    return surveys;
  }

  public async create({
    title,
    description,
  }: ICreateSurveyDTO): Promise<Survey> {
    const survey = this.ormRepository.create({ title, description });

    await this.ormRepository.save(survey);

    return survey;
  }
}
