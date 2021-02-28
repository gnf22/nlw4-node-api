import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { SendMailService } from '@modules/surveys_users/services/SendMailService';

export class SendMailController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, survey_id } = request.body;

    const sendMail = container.resolve(SendMailService);

    const mail = await sendMail.execute({
      email,
      survey_id,
    });

    return response.json(mail);
  }
}
