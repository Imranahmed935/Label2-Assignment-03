# 📚 Library Management System

**Live API Testable at Localhost**: `http://localhost:5000/api`

---

## Overview

The Book Management & Borrowing System is a robust backend application built with Express.js, TypeScript, and MongoDB. It allows users to manage a digital library — including features like adding books, updating availability, borrowing copies with quantity checks, and viewing aggregate borrowing data.

---

## Key Features

- **Complete Book CRUD**: Create, Read, Update, and Delete books in the system with full validation.
- **Borrowing Logic**: Borrow books with quantity verification and automatic availability status updates.
- **Aggregate Summary**: Get total quantity borrowed for each book using MongoDB aggregation.
- **Validation & Error Handling**: Robust error messages and input checks ensure reliability and safety.
- **RESTful API Structure**: Clean and scalable routing system using Express Router.
- **TypeScript Support**: Strong typing for maintainable and error-free development.

---

## Technologies Used

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Environment**: dotenv for configuration
- **Dev Tools**: Nodemon, ts-node, ESLint (optional)

---

## Setup and Installation

To run this project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/book-management-api.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd book-management-api
   ```

3. **Install server dependencies**:

   ```bash
   npm install
   ```

4. **Create a `.env` file** in the root with the following content:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/book-management
   ```

5. **Run the development server**:

   ```bash
   npm run dev
   ```

6. The API will be available at: `http://localhost:5000/api`

---

## API Endpoints

### 📘 Book Routes

| Method | Endpoint         | Description                                |
| ------ | ---------------- | ------------------------------------------ |
| GET    | `/api/books`     | Get all books with filter, sort, and limit |
| POST   | `/api/books`     | Add a new book                             |
| PUT    | `/api/books/:id` | Update a book by ID                        |
| DELETE | `/api/books/:id` | Delete a book by ID                        |

### 📦 Borrow Routes

| Method | Endpoint      | Description                              |
| ------ | ------------- | ---------------------------------------- |
| POST   | `/api/borrow` | Borrow books (quantity logic included)   |
| GET    | `/api/borrow` | Borrow summary using MongoDB aggregation |

---

## Sample Data

### ➕ Sample Book Entry

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "NON_FICTION",
  "isbn": "9780735211292",
  "description": "A proven framework for building better habits.",
  "copies": 40,
  "available": true
}
```
