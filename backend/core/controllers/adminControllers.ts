
import { Request, Response } from "express";
import { Book ,Transaction} from "../initializer/database"; // Ensure correct path

export const addBook = async (req: Request, res: Response): Promise<any> => {
  try {

    console.log("Received Data:", req.body); // ✅ Debugging
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
    const books = await Book.find(); // Get all books without filtering

    return res.status(200).json({ books }); // Return a single array
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


export const updateBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params; // Book ID from URL params

    // Find the latest transaction where the book is still borrowed
    const transaction = await Transaction.findOne({
      book: id, // ✅ Find by book ID only
      status: "borrowed", // ✅ Check if the book is currently borrowed
    }).sort({ borrowDate: -1 }); // ✅ Get the most recent transaction

    if (!transaction) {
      return res.status(400).json({ message: "No active borrow record found for this book." });
    }

    // Mark the transaction as returned
    transaction.returnDate = new Date();
    transaction.status = "returned";
    await transaction.save();

    // Update book availability
    const updatedBook = await Book.findByIdAndUpdate(id, { available: true }, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: "Failed to update the book" });
    }

    return res.json({ message: "Book returned successfully", book: updatedBook });
  } catch (error) {
    console.error("Failed to update book", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
