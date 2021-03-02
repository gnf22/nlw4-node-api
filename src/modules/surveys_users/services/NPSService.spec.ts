import { FakeSurveysUsersRepository } from '../repositories/fakes/FakeSurveysUsersRepository';

import { NPSService } from './NPSService';

let fakeSurveysUsersRepository: FakeSurveysUsersRepository;
let nps: NPSService;

describe('NPS', () => {
  beforeEach(() => {
    fakeSurveysUsersRepository = new FakeSurveysUsersRepository();
    nps = new NPSService(fakeSurveysUsersRepository);
  });

  it('Should be able to see a NPS request', async () => {
    const surveyUser = await fakeSurveysUsersRepository.create({
      survey_id: 'survey',
      user_id: 'user',
    });

    surveyUser.value = 10;

    const npsCalc = await nps.execute({
      survey_id: surveyUser.survey_id,
    });

    expect(npsCalc).toHaveProperty('detractors');
  });
});
