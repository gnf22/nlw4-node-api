import { SurveyUser } from '../infra/typeorm/entities/SurveyUser';
import { ICreateSurveysUsersDTO } from '../dtos/ICreateSurveysUsersDTO';

export interface ISurveysUsersRepository {
  findByUserId(id: string): Promise<SurveyUser | undefined>;
  create(data: ICreateSurveysUsersDTO): Promise<SurveyUser>;
}
