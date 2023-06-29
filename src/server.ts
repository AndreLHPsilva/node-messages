import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import "./container";
import { IReturnApi, ReturnAPI } from "./helpers/returnAPI";
import cors from "cors";
import path from "path";
import { routes } from "./routes";
import { ApiError } from "./errors/ApiError";
import "dotenv/config";

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.returnApi = (data: IReturnApi): Response => {
    const returnData = {
      data: data.data ?? null,
      statusHTTP: data.statusHTTP ?? 200,
      message: data.message ?? "",
      developerMessage: data.developerMessage ?? "",
    };

    return res.status(returnData.statusHTTP).json(returnData);
  };
  next();
});

app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.returnApi({
      data: null,
      developerMessage: err.message,
      message: err.message,
      statusHTTP: err.statusCode,
    });
  }
  return res.returnApi({
    data: null,
    developerMessage: err.message,
    message: err.message,
    statusHTTP: 500,
  });
});

app.use(function (req, res, next) {
  res.returnApi({ statusHTTP: 404, message: "Rota não encontrada" });
});

app.listen(process.env.PORT ?? 3000, () =>
  console.log(`listen on http://127.0.0.1:${process.env.PORT ?? 3000}`)
);
