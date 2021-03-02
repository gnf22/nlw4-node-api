import { AppError } from '@shared/errors/AppError';
import { FakeSurveysUsersRepository } from '../repositories/fakes/FakeSurveysUsersRepository';

import { RateExperienceService } from './RateExperienceService';

let fakeSurveysUsersRepository: FakeSurveysUsersRepository;
let rateExperience: RateExperienceService;

describe('RateExperience', () => {
  beforeEach(() => {
    fakeSurveysUsersRepository = new FakeSurveysUsersRepository();
    rateExperience = new RateExperienceService(fakeSurveysUsersRepository);
  });

  it('Should be able to rate a value for a survey', async () => {
    const surveyUser = await fakeSurveysUsersRepository.create({
      survey_id: 'survey',
      user_id: 'user',
    });

    const rate = await rateExperience.execute({
      u: surveyUser.id,
      value: 10,
    });

    expect(rate.value).toBe(10);
  });

  it('Should not be able to rate a value for a survey for a non-existing survey', async () => {
    await expect(
      rateExperience.execute({
        u: 'random-survey?',
        value: 10,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
