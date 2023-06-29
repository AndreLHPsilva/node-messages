import { Request, Response } from "express";
import { CreateMessagesUseCase } from "./CreateMessagesUseCase";
import { CreateMessagesValidation } from "./CreateMessagesValidation";
import { container } from "tsyringe";

export class CreateMessagesController {
  async handle(req: Request, res: Response) {
    const { message, receiver_id } = CreateMessagesValidation.validate(
      req.body
    );
    const sender_id = req.auth_user!.id;

    const createmessagesUseCase = container.resolve(CreateMessagesUseCase);

    await createmessagesUseCase.execute({ message, sender_id, receiver_id });

    return res.returnApi({
      data: null,
      message: "Mensagem criada.",
      developerMessage: "",
      statusHTTP: 201,
    });
  }
}
