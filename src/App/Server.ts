import { Server } from "http";
import { app } from "./App";
import mongoose from "mongoose";
const PORT = 5000;

let server: Server;

async function connectedDB() {
  try {
    await mongoose.connect('mongodb+srv://mongoTodo:mongodb@cluster0.haqk7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('mongodb connected!')
    server = app.listen(PORT, () => {
      console.log(`Library Management App server is Running on port ${PORT}`);
    });
  } catch (error) {
    console.log('Database connection failed', error);
  }
}

connectedDB();
