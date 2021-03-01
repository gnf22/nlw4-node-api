import { getRepository, Repository, Not, IsNull } from 'typeorm';

import { ISurveysUsersRepository } from '@modules/surveys_users/repositories/ISurveysUsersRepository';
import { ICreateSurveysUsersDTO } from '@modules/surveys_users/dtos/ICreateSurveysUsersDTO';

import { IFindSurveysUsersDTO } from '@modules/surveys_users/dtos/IFindSurveysUsersDTO';
import { SurveyUser } from '../entities/SurveyUser';

export class SurveysUsersRepository implements ISurveysUsersRepository {
  private ormRepository: Repository<SurveyUser>;

  constructor() {
    this.ormRepository = getRepository(SurveyUser);
  }

  public async findById(id: string): Promise<SurveyUser | undefined> {
    const survey_user = await this.ormRepository.findOne(id);

    return survey_user;
  }

  public async findBySurveyId(survey_id: string): Promise<SurveyUser[]> {
    const surveys_users = await this.ormRepository.find({
      where: { survey_id, value: Not(IsNull()) },
    });

    return surveys_users;
  }

  public async findByUserAndSurveyId({
    user_id,
    survey_id,
  }: IFindSurveysUsersDTO): Promise<SurveyUser | undefined> {
    const survey_user = await this.ormRepository.findOne({
      where: { user_id, survey_id, value: null },
      relations: ['user', 'survey'],
    });

    return survey_user;
  }

  public async create({
    user_id,
    survey_id,
  }: ICreateSurveysUsersDTO): Promise<SurveyUser> {
    const survey_user = this.ormRepository.create({ user_id, survey_id });

    await this.ormRepository.save(survey_user);

    return survey_user;
  }

  public async save(surveyUser: SurveyUser): Promise<SurveyUser> {
    return this.ormRepository.save(surveyUser);
  }
}
