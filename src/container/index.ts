import { container } from "tsyringe";
import { UsersRepositoryPrisma } from "../repositories/prisma/UsersRepositoryPrisma";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { MessagesRepositoryPrisma } from "../repositories/prisma/MessagesRepositoryPrisma";
import { IMessagesRepository } from "../repositories/IMessagesRepository";

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepositoryPrisma);
container.registerSingleton<IMessagesRepository>("MessagesRepository", MessagesRepositoryPrisma);

