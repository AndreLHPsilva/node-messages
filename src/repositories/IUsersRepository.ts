import { IUser } from "../models/User";

export interface ICreateUserDTO {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface IAuthenticateUserDTO {
  email: string;
  password: string;
}

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  getById(user_id: string): Promise<IUser>;
  getByEmail(email: string): Promise<IUser>;
  updateLastLogin(user_id: string): Promise<void>;
}
