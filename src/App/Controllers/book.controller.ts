import express, { NextFunction, Request, Response } from "express";
import { Book } from "../Models/book.model";
import globalErrorHandler from "../GlobalError/error";

export const bookRouter = express.Router();

bookRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookData = req.body;
      const data = await Book.create(bookData);
      res.status(201).json({
        success: true,
        message: "Book Created Successfully",
        data,
      });
    } catch (error) {
      next(globalErrorHandler);
    }
  }
);

bookRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "5",
    } = req.query;

    const query: any = {};
    if (filter) {
      query.genre = (filter as string).toUpperCase();
    }

    const sortOption: any = {};
    sortOption[sortBy as string] = sort === "asc" ? 1 : -1;

    const books = await Book.find(query)
      .sort(sortOption)
      .limit(parseInt(limit as string));

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
     next(globalErrorHandler);
  }
});

bookRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const singleData = await Book.findById(id);
      res.status(200).json({
        success: true,
        message: "successful",
        data: singleData,
      });
    } catch (error) {
       next(globalErrorHandler);
    }
  }
);
