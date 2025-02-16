import { Request, Response } from "express";
import { Book, Transaction } from "../initializer/database"; // Ensure correct path

export const addBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, author, description } = req.body;

    if (!title || !author || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save the book to MongoDB
    const newBook = await Book.create({ title, author, description });
    console.log("Book added succesfully");
    return res
      .status(201)
      .json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error in adding a book:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const book = await Book.find();
    return res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);
    console.log("Received book ID:", id);
    if (!deleteBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book removed successfully" });
  } catch (error) {
    console.error("Error in deleting a book", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};
