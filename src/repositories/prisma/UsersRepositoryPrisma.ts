import { IUser } from "../../models/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";
import { prisma } from "./";

export class UsersRepositoryPrisma implements IUsersRepository {
  private repository;

  constructor() {
    this.repository = prisma.users;
  }
  async getById(user_id: string): Promise<IUser> {
    const user = await this.repository.findFirst({
      where: { id: user_id, deleted_at: null },
    });

    return user as IUser;
  }

  async getByEmail(email: string): Promise<IUser> {
    const user = await this.repository.findFirst({
      where: { email, deleted_at: null },
    });

    return user as IUser;
  }
  async create(data: ICreateUserDTO): Promise<void> {
    await this.repository.create({
      data: {
        ...data,
      },
    });

    return;
  }

  async updateLastLogin(user_id: string): Promise<void> {
    await this.repository.update({
      where: { id: user_id },
      data: { last_login: new Date() },
    });

    return;
  }
}
