import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import convoRouter from "./routes/convo.routes.js"
import messageRouter from "./routes/message.routes.js"
import { errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app: Express = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/convos", convoRouter);
  app.use("/convos", messageRouter);

  app.use(errorHandler);

  return app;
}