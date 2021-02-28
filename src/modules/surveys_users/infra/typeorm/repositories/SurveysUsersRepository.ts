import { getRepository, Repository } from 'typeorm';

import { ISurveysUsersRepository } from '@modules/surveys_users/repositories/ISurveysUsersRepository';
import { ICreateSurveysUsersDTO } from '@modules/surveys_users/dtos/ICreateSurveysUsersDTO';

import { SurveyUser } from '../entities/SurveyUser';

export class SurveysUsersRepository implements ISurveysUsersRepository {
  private ormRepository: Repository<SurveyUser>;

  constructor() {
    this.ormRepository = getRepository(SurveyUser);
  }

  public async findByUserId(id: string): Promise<SurveyUser | undefined> {
    const surveyUser = await this.ormRepository.findOne({
      where: { user_id: id, value: null },
      relations: ['user', 'survey'],
    });

    return surveyUser;
  }

  public async create({
    user_id,
    survey_id,
  }: ICreateSurveysUsersDTO): Promise<SurveyUser> {
    const survey_user = this.ormRepository.create({ user_id, survey_id });

    await this.ormRepository.save(survey_user);

    return survey_user;
  }
}
