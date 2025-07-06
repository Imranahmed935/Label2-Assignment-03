"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../Models/book.model");
exports.bookRouter = express_1.default.Router();
exports.bookRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookData = req.body;
        const data = yield book_model_1.Book.create(bookData);
        res.status(201).json({
            success: true,
            message: "Book Created Successfully",
            data,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = "5", } = req.query;
        const query = {};
        if (typeof filter === "string") {
            query.genre = filter.toUpperCase();
        }
        const sortOption = {};
        sortOption[sortBy] = sort === "asc" ? 1 : -1;
        const books = yield book_model_1.Book.find(query)
            .sort(sortOption)
            .limit(parseInt(limit, 10));
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookRouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const singleData = yield book_model_1.Book.findById(id);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: singleData,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookRouter.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const updateBook = yield book_model_1.Book.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updateBook,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookRouter.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deletedData = yield book_model_1.Book.findByIdAndDelete(id);
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
    }
    catch (error) {
        next(error);
    }
}));
