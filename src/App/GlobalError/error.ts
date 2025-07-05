import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err.name === "ValidationError") {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: err,
    });
  }

  res.status(500).json({
    message: "Something went wrong",
    success: false,
    error: err.message,
  });
};

export default globalErrorHandler;
