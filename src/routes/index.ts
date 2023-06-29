import express from "express";
import { authRoutes } from "./auth.routes";
import { usersRoutes } from "./users.routes";
import { messagesRoutes } from "./messages.routes";

export const routes = express.Router();

routes.use('/users', usersRoutes)
routes.use('/auth', authRoutes)
routes.use('/messages', messagesRoutes)
