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
      next(error);
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
    next(error);
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
        message: "Book retrieved successfully",
        data: singleData,
      });
    } catch (error) {
      next(error);
    }
  }
);

bookRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const updateData = req.body;
      const updateBook = await Book.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: updateBook,
      });
    } catch (error) {
      next(error);
    }
  }
);

bookRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const deletedData = await Book.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: deletedData,
      });
    } catch (error) {
      next(error);
    }
  }
);
