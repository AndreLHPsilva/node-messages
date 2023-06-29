export interface IMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  is_read: boolean;
  deleted_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
