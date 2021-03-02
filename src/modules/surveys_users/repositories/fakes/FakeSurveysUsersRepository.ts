import { IFindSurveysUsersDTO } from '@modules/surveys_users/dtos/IFindSurveysUsersDTO';

import { ICreateSurveysUsersDTO } from '@modules/surveys_users/dtos/ICreateSurveysUsersDTO';
import { ISurveysUsersRepository } from '../ISurveysUsersRepository';

import { SurveyUser } from '../../infra/typeorm/entities/SurveyUser';

export class FakeSurveysUsersRepository implements ISurveysUsersRepository {
  private surveysUsers: SurveyUser[] = [];

  public async findById(id: string): Promise<SurveyUser | undefined> {
    const findSurveyUser = this.surveysUsers.find(
      surveyUser => surveyUser.id === id,
    );

    return findSurveyUser;
  }

  public async findBySurveyId(survey_id: string): Promise<SurveyUser[]> {
    const findSurveyUser = this.surveysUsers.filter(
      surveyUser => surveyUser.survey_id === survey_id,
    );

    return findSurveyUser;
  }

  public async findByUserAndSurveyId({
    survey_id,
    user_id,
  }: IFindSurveysUsersDTO): Promise<SurveyUser | undefined> {
    const findSurveyUser = this.surveysUsers.find(
      surveyUser =>
        surveyUser.survey_id === survey_id && surveyUser.user_id === user_id,
    );

    return findSurveyUser;
  }

  public async create({
    survey_id,
    user_id,
  }: ICreateSurveysUsersDTO): Promise<SurveyUser> {
    const surveyUser = new SurveyUser();

    Object.assign(surveyUser, { survey_id, user_id });

    this.surveysUsers.push(surveyUser);

    return surveyUser;
  }

  public async save(surveyUser: SurveyUser): Promise<SurveyUser> {
    const findIndex = this.surveysUsers.findIndex(
      findSurveyUser => findSurveyUser.id === surveyUser.id,
    );

    this.surveysUsers[findIndex] = surveyUser;

    return surveyUser;
  }
}
