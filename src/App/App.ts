import express, { Application, Request, Response } from "express";
import { bookRouter } from "./Controllers/book.controller";

import borrowRouter from "./Controllers/borrow.controller";


export const app: Application = express();

app.use(express.json());

app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management App server is Ready!");
});


