import mongoose from "mongoose";
import { app } from "./App";
import dotenv from "dotenv";
dotenv.config();

const PORT = 5000;

async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("✅ MongoDB connected!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at port:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // optional: force exit on failure
  }
}

connectDB();
