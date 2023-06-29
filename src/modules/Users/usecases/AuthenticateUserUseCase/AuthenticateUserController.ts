import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { AuthenticateUserValidation } from "./AuthenticateUserValidation";
import { container } from "tsyringe";

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = AuthenticateUserValidation.validate(req.body);

    const authenticateuserUseCase = container.resolve(AuthenticateUserUseCase);

    const userAutenticated = await authenticateuserUseCase.execute({
      email,
      password,
    });

    return res.returnApi({
      data: userAutenticated,
      message: "Login realizado.",
      developerMessage: "",
      statusHTTP: 200,
    });
  }
}
