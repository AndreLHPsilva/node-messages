import express from "express";
import { CreateMessagesController } from "../modules/Messages/usecases/CreateMessagesUseCase/CreateMessagesController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

export const messagesRoutes = express.Router();
const authMiddleware = new AuthMiddleware();

const createMessagesController = new CreateMessagesController();

messagesRoutes.post("/", authMiddleware.auth, async (req, res) => {
  return await createMessagesController.handle(req, res);
});
