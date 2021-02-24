import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { CreateUserService } from '@modules/users/services/CreateUserService';

export class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
    });

    return response.json(user);
  }
}
