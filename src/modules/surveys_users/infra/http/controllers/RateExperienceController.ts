import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { RateExperienceService } from '@modules/surveys_users/services/RateExperienceService';

export class RateExperienceController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { value } = request.params;
    const { u } = request.query;

    const rateExperience = container.resolve(RateExperienceService);

    const rate = await rateExperience.execute({
      value: Number(value),
      u: String(u),
    });

    return response.json(rate);
  }
}
