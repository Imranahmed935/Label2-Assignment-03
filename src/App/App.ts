import express, { Application, Request, Response } from "express";
import { bookRouter } from "./Controllers/book.controller";
import { globalErrorHandler } from "./GlobalError/error";
export const app: Application = express();

app.use(express.json());


app.use("/api/books", bookRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management App server is Ready!");
});

app.use(globalErrorHandler);