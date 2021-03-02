import { FakeMailProvider } from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { FakeSurveysRepository } from '@modules/surveys/repositories/fakes/FakeSurveysRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeSurveysUsersRepository } from '../repositories/fakes/FakeSurveysUsersRepository';

import { SendMailService } from './SendMailService';

let fakeMailProvider: FakeMailProvider;

let fakeUsersRepository: FakeUsersRepository;
let fakeSurveysRepository: FakeSurveysRepository;
let fakeSurveysUsersRepository: FakeSurveysUsersRepository;

let sendMail: SendMailService;

describe('SendMail', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();

    fakeUsersRepository = new FakeUsersRepository();
    fakeSurveysRepository = new FakeSurveysRepository();
    fakeSurveysUsersRepository = new FakeSurveysUsersRepository();

    fakeSurveysUsersRepository = new FakeSurveysUsersRepository();

    sendMail = new SendMailService(
      fakeUsersRepository,
      fakeSurveysRepository,
      fakeSurveysUsersRepository,
      fakeMailProvider,
    );
  });

  it('should be able to send a first mail.', async () => {
    const mail = jest.spyOn(fakeMailProvider, 'sendMail');

    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo@jest.com',
    });

    const survey = await fakeSurveysRepository.create({
      title: 'Hey, can you gonna call with me, please?',
      description: 'I have a question for you.',
    });

    await sendMail.execute({
      email: user.email,
      survey_id: survey.id,
    });

    await fakeSurveysUsersRepository.create({
      survey_id: survey.id,
      user_id: user.id,
    });

    expect(mail).toHaveBeenCalled();
  });

  it('should be able to send a mail for the same surveyUser.', async () => {
    const mail = jest.spyOn(fakeMailProvider, 'sendMail');

    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo@jest.com',
    });

    const survey = await fakeSurveysRepository.create({
      title: 'Hey, can you gonna call with me, please?',
      description: 'I have a question for you.',
    });

    await fakeSurveysUsersRepository.create({
      survey_id: survey.id,
      user_id: user.id,
    });

    await sendMail.execute({
      email: user.email,
      survey_id: survey.id,
    });

    expect(mail).toHaveBeenCalled();
  });

  it('should not be able to send a mail for a non-existing user.', async () => {
    const survey = await fakeSurveysRepository.create({
      title: 'Hey, can you gonna call with me, please?',
      description: 'I have a question for you.',
    });

    await expect(
      sendMail.execute({
        email: 'non-existing@jest.com',
        survey_id: survey.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to send a mail for a non-existing survey.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo@jest.com',
    });

    await expect(
      sendMail.execute({
        email: user.email,
        survey_id: 'non-existing-survey-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
