import { Survey } from '../infra/typeorm/entities/Survey';
import { ICreateSurveyDTO } from '../dtos/ICreateSurveyDTO';

export interface ISurveysRepository {
  create(data: ICreateSurveyDTO): Promise<Survey>;
  findById(id: string): Promise<Survey | undefined>;
  findAllSurveys(): Promise<Survey[]>;
}
