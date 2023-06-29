import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserValidation } from "./CreateUserValidation";
import { container } from "tsyringe";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, phone, email, password } = CreateUserValidation.validate(
      req.body
    );

    const createuserUseCase = container.resolve(CreateUserUseCase);

    await createuserUseCase.execute({ name, phone, email, password });

    return res.returnApi({
      data: null,
      message: "Usuário criado com sucesso.",
      developerMessage: "Created User",
      statusHTTP: 201,
    });
  }
}
