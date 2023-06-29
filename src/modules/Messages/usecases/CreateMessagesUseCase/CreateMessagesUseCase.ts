import { inject, injectable } from "tsyringe";
import {
  ICreateMessageDTO,
  IMessagesRepository,
} from "../../../../repositories/IMessagesRepository";
import { IUsersRepository } from "../../../../repositories/IUsersRepository";
import { ApiError } from "../../../../errors/ApiError";

@injectable()
export class CreateMessagesUseCase {
  constructor(
    @inject("UsersRepository")
    private UsersRepository: IUsersRepository,
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository
  ) {}

  async execute({ receiver_id, sender_id, message }: ICreateMessageDTO) {
    const receiver = await this.UsersRepository.getById(receiver_id);

    if (!receiver) {
      throw new ApiError("Destinatário não encontrado.");
    }

    const sender = await this.UsersRepository.getById(sender_id);

    if (!sender) {
      throw new ApiError("Remetente não encontrado.");
    }

    if(receiver_id === sender_id){
        throw new ApiError('Você não pode enviar mensagem para si mesmo.')
    }

    await this.messagesRepository.create({ message, receiver_id, sender_id });

    return;
  }
}
