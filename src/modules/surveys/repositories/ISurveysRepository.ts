import { Survey } from '../infra/typeorm/entities/Survey';
import { ICreateSurveyDTO } from '../dtos/ICreateSurveyDTO';

export interface ISurveysRepository {
  create(data: ICreateSurveyDTO): Promise<Survey>;
  findAllSurveys(): Promise<Survey[]>;
}
