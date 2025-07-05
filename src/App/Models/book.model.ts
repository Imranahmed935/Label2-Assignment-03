import { Schema, model } from "mongoose";
import { IBook } from "../Interfaces/book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
      type: String,
      required: true,
      enum: {
        values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
        message: "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
      },
    },
    isbn: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "", trim: true },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a non-negative number"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer",
      },
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// ✅ Instance Method
bookSchema.methods.handleBorrow = async function (quantity: number): Promise<void> {
  if (this.copies < quantity) {
    throw new Error("Not enough copies available");
  }

  this.copies -= quantity;
  if (this.copies === 0) {
    this.available = false;
  }

  await this.save();
};

export const Book = model<IBook>("Book", bookSchema);
