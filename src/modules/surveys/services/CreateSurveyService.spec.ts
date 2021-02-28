import { FakeSurveysRepository } from '../repositories/fakes/FakeSurveysRepository';
import { CreateSurveyService } from './CreateSurveyService';

let fakeSurveysRepository: FakeSurveysRepository;
let createSurvey: CreateSurveyService;

describe('CreateSurvey', () => {
  beforeEach(() => {
    fakeSurveysRepository = new FakeSurveysRepository();
    createSurvey = new CreateSurveyService(fakeSurveysRepository);
  });

  it('should be able to create a new survey', async () => {
    const user = await createSurvey.execute({
      title: 'Olá a todos',
      description: 'Gostariamos de te fazer uma pergunta.',
    });

    expect(user).toHaveProperty('id');
    expect(user.title).toBe('Olá a todos');
  });
});
