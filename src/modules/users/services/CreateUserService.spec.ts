import { AppError } from '@shared/errors/AppError';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { CreateUserService } from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Gustavo',
      email: 'gustavo@tets.com',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Gustavo');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUser.execute({
      name: 'John',
      email: 'john@test.com',
    });

    await expect(
      createUser.execute({
        name: 'John',
        email: 'john@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
