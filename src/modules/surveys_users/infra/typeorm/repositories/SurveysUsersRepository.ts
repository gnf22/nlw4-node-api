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
    const surveyUser = await this.ormRepository.findOne(id);

    return surveyUser;
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
    const surveyUser = await this.ormRepository.findOne({
      where: { user_id, survey_id },
      relations: ['user', 'survey'],
    });

    return surveyUser;
  }

  public async create({
    user_id,
    survey_id,
  }: ICreateSurveysUsersDTO): Promise<SurveyUser> {
    const surveyUser = this.ormRepository.create({ user_id, survey_id });

    await this.ormRepository.save(surveyUser);

    return surveyUser;
  }

  public async save(surveyUser: SurveyUser): Promise<SurveyUser> {
    return this.ormRepository.save(surveyUser);
  }
}
