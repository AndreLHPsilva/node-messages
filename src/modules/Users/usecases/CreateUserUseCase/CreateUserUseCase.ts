import { inject, injectable } from "tsyringe";
import { ApiError } from "../../../../errors/ApiError";
import {
  ICreateUserDTO,
  IUsersRepository,
} from "../../../../repositories/IUsersRepository";
import { hash } from "bcrypt";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ email, password, ...data }: ICreateUserDTO): Promise<void> {
    const user = await this.usersRepository.getByEmail(email);

    if (user) {
      throw new ApiError("Conta não encontrada.");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      ...data,
      email,
      password: passwordHash,
    });

    return;
  }
}
