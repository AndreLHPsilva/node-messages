import express from "express";
import { CreateUserController } from "../modules/Users/usecases/CreateUserUseCase/CreateUserController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

export const usersRoutes = express.Router();

const authMiddleware = new AuthMiddleware();
const createUserController = new CreateUserController();

usersRoutes.post("/", async (req, res) => {
  return await createUserController.handle(req, res);
});
