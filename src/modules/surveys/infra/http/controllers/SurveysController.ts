import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { CreateSurveyService } from '@modules/surveys/services/CreateSurveyService';
import { FindSurveysService } from '@modules/surveys/services/FindSurveysService';

export class SurveysController {
  async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const createSurvey = container.resolve(CreateSurveyService);

    const survey = await createSurvey.execute({
      title,
      description,
    });

    return response.json(survey);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const findSurveys = container.resolve(FindSurveysService);

    const surveys = await findSurveys.execute();

    return response.json(surveys);
  }
}
