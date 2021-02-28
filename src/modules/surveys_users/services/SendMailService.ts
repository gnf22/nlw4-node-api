import { AppError } from '@shared/errors/AppError';

import path from 'path';

import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { ISurveysRepository } from '@modules/surveys/repositories/ISurveysRepository';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';

import { ISurveysUsersRepository } from '../repositories/ISurveysUsersRepository';

import { SurveyUser } from '../infra/typeorm/entities/SurveyUser';

interface IRequest {
  email: string;
  survey_id: string;
}

@injectable()
export class SendMailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('SurveysRepository')
    private surveysRepository: ISurveysRepository,

    @inject('SurveysUsersRepository')
    private surveysUsersRepository: ISurveysUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {
    /** */
  }

  public async execute({ email, survey_id }: IRequest): Promise<SurveyUser> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists', 404);
    }

    const survey = await this.surveysRepository.findById(survey_id);

    if (!survey) {
      throw new AppError('Survey does not exists', 404);
    }

    const surveyUserAlreadyExists = await this.surveysUsersRepository.findByUserId(
      user.id,
    );

    const npsMailTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'nps_mail.hbs',
    );

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL || 'http://localhost:3333/answers',
    };

    if (surveyUserAlreadyExists) {
      await this.mailProvider.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: survey.title,
        templateData: {
          file: npsMailTemplate,
          variables,
        },
      });

      return surveyUserAlreadyExists;
    }

    const surveyUser = await this.surveysUsersRepository.create({
      user_id: user.id,
      survey_id,
    });

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: survey.title,
      templateData: {
        file: npsMailTemplate,
        variables,
      },
    });

    return surveyUser;
  }
}
