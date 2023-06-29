import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ApiError } from "../errors/ApiError";
import "dotenv/config";
import { UsersRepositoryPrisma } from "../repositories/prisma/UsersRepositoryPrisma";

interface IPayload {
    sub: string;
}

export class AuthMiddleware {

  async auth(req: Request, res: Response, next: NextFunction) {

      const authHeader = req.headers.authorization;

      if (!authHeader) {
          throw new ApiError("Token de acesso não informado", 401);
      }

      const [, token] = authHeader.split(" ");

      try {
          const { sub: user_id } = verify(token, process.env.JWT_SECRET as string) as IPayload;

          const usersRepository = new UsersRepositoryPrisma();
          const user = await usersRepository.getById(user_id);

          if (!user) {
              throw new ApiError("Usuário não encontrado");
          }

          req.auth_user = user

          next();
          
      } catch(error) {
          throw new ApiError("O token de acesso é invalido", 401);
      }
  }
}