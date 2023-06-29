import { inject, injectable } from "tsyringe";
import {
  IAuthenticateUserDTO,
  IUsersRepository,
} from "../../../../repositories/IUsersRepository";
import { ApiError } from "../../../../errors/ApiError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IResponse {
    account: {
        email: string;
    };
    token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IAuthenticateUserDTO) {
    const user = await this.usersRepository.getByEmail(email);

    if (!user) {
      throw new ApiError("Email ou senha estão incorretos");
    }

    const passwordMatch = await compare(password, user.password!);

    if(!passwordMatch){
        throw new ApiError("Email ou senha estão incorretos");
    }

    const token = sign({}, process.env.JWT_SECRET as string, {
        subject: user.id,
        expiresIn: "1d",
    });

    await this.usersRepository.updateLastLogin(user.id);

    delete user.password;

    const tokenReturn: IResponse = {
        token,
        account: user
    }

    return tokenReturn;

  }
}
