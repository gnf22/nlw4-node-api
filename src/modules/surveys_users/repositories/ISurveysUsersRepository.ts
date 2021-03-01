import { SurveyUser } from '../infra/typeorm/entities/SurveyUser';
import { ICreateSurveysUsersDTO } from '../dtos/ICreateSurveysUsersDTO';
import { IFindSurveysUsersDTO } from '../dtos/IFindSurveysUsersDTO';

export interface ISurveysUsersRepository {
  findByUserAndSurveyId(
    data: IFindSurveysUsersDTO,
  ): Promise<SurveyUser | undefined>;
  findById(id: string): Promise<SurveyUser | undefined>;
  findBySurveyId(survey_id: string): Promise<SurveyUser[]>;
  create(data: ICreateSurveysUsersDTO): Promise<SurveyUser>;
  save(surveyUser: SurveyUser): Promise<SurveyUser>;
}
