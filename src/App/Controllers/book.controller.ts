import express, { NextFunction, Request, Response } from "express";
import { Book } from "../Models/book.model";


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


bookRouter.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "5",
      page = "1",
    } = req.query;

    
    const query: Record<string, unknown> = {};
    if (typeof filter === "string") {
      query.genre = filter.toUpperCase();
    }

  
    const sortOption: Record<string, 1 | -1> = {};
    sortOption[sortBy as string] = sort === "asc" ? 1 : -1;

   
    const limitNum = parseInt(limit as string, 10);
    const pageNum = parseInt(page as string, 10);
    const skip = (pageNum - 1) * limitNum;

    
    const totalBooks = await Book.countDocuments(query);


    const books = await Book.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

   
    const meta = {
      totalBooks,
      totalPages: Math.ceil(totalBooks / limitNum),
      currentPage: pageNum,
      limit: limitNum,
      hasNextPage: pageNum * limitNum < totalBooks,
      hasPrevPage: pageNum > 1
    };

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      meta,
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
      if (!deletedData) {
        res.status(404).json({
          success: false,
          message: "Book not found",
          data: null,
        });
      }
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
);
