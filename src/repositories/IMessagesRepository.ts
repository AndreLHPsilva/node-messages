export interface ICreateMessageDTO{
  message: string;
  sender_id: string;
  receiver_id: string;
}

export interface IMessagesRepository{
  create(data: ICreateMessageDTO): Promise<void>;
}