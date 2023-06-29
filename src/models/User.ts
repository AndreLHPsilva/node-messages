export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  last_login?: Date;
  phone?: string;
  deleted_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
