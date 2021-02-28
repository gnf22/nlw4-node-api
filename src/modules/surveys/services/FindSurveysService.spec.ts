import { FakeSurveysRepository } from '../repositories/fakes/FakeSurveysRepository';
import { FindSurveysService } from './FindSurveysService';

let fakeSurveysRepository: FakeSurveysRepository;
let findSurvey: FindSurveysService;

describe('FindSurveys', () => {
  beforeEach(() => {
    fakeSurveysRepository = new FakeSurveysRepository();
    findSurvey = new FindSurveysService(fakeSurveysRepository);
  });

  it('should be able to list all surveys', async () => {
    const survey1 = await fakeSurveysRepository.create({
      title: 'Olá a todos',
      description: 'Posso falar com você um instante?',
    });

    const survey2 = await fakeSurveysRepository.create({
      title: 'Hello there!',
      description: 'General Kenobi?',
    });

    const surveys = await findSurvey.execute();

    expect(surveys).toEqual([survey1, survey2]);
  });
});
