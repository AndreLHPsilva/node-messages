import { ICreateMessageDTO, IMessagesRepository } from "../IMessagesRepository";
import { prisma } from "./";

export class MessagesRepositoryPrisma implements IMessagesRepository {
  private repository;

  constructor() {
    this.repository = prisma.messages;
  }
  async create({
    message,
    receiver_id,
    sender_id,
  }: ICreateMessageDTO): Promise<void> {
    await this.repository.create({
      data: {
        message,
        receiver_id,
        sender_id,
      },
    });
  }
}
