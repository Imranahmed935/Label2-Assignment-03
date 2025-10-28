import express, { Request, Response, NextFunction } from "express";
import { Book } from "../Models/book.model";
import { Borrow } from "../Models/borrow.model";
import { IBook } from "../Interfaces/book.interface";

const borrowRouter = express.Router();

borrowRouter.post(
  "/borrow/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { book: bookId, quantity, dueDate } = req.body;

      const book = (await Book.findById(bookId)) as IBook | null;
      if (!book) {
        res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      await book?.handleBorrow(quantity);

      const borrowRecord = await Borrow.create({
        book: book?._id,
        quantity,
        dueDate,
      });

      res.status(200).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrowRecord,
      });
    } catch (error) {
      next(error);
    }
  }
);

borrowRouter.get("/borrow", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book", 
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $lookup: {
          from: "books", 
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails"
        }
      },
      {
        $unwind: "$bookDetails"
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn"
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary
    });
  } catch (error) {
    next(error);
  }
});


export default borrowRouter;
