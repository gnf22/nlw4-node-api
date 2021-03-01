import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { NPSService } from '@modules/surveys_users/services/NPSService';

export class NPSController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { survey_id } = request.params;

    const nps = container.resolve(NPSService);

    const rate = await nps.execute({
      survey_id,
    });

    return response.json(rate);
  }
}
