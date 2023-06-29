import express from "express";
import { AuthenticateUserController } from "../modules/Users/usecases/AuthenticateUserUseCase/AuthenticateUserController";


export const authRoutes = express.Router();

const authenticateUserController = new AuthenticateUserController();

authRoutes.post("/", async (req, res) => {
  return await authenticateUserController.handle(req, res);
});
