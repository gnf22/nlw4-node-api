import { v4 as uuid } from 'uuid';

import { ISurveysRepository } from '@modules/surveys/repositories/ISurveysRepository';
import { ICreateSurveyDTO } from '@modules/surveys/dtos/ICreateSurveyDTO';

import { Survey } from '../../infra/typeorm/entities/Survey';

export class FakeSurveysRepository implements ISurveysRepository {
  private surveys: Survey[] = [];

  public async findAllSurveys(): Promise<Survey[]> {
    return this.surveys;
  }

  public async create({
    title,
    description,
  }: ICreateSurveyDTO): Promise<Survey> {
    const survey = new Survey();

    Object.assign(survey, { id: uuid(), title, description });

    this.surveys.push(survey);

    return survey;
  }
}
