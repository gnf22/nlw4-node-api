import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { User } from '../infra/typeorm/entities/User';

import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {
    /** */
  }

  public async execute({ name, email }: IRequest): Promise<User> {
    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

    if (emailAlreadyInUse) {
      throw new AppError('E-mail already in use. Choose another!', 409);
    }

    const user = await this.usersRepository.create({
      name,
      email,
    });

    return user;
  }
}
