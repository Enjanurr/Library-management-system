import { Request, Response } from "express";
import { Book ,Transaction,User} from "../initializer/database"; // ✅ Ensure this is the correct path

// Fetch all books
export const home = async (req: Request, res: Response): Promise<any> => {
  try {
    const allBooks = await Book.find(); // ✅ Fetch all books from database
    return res.status(200).json(allBooks);
  } catch (error) {
    console.error("Error fetching books", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Search books based on title
export const Search = async (req: Request, res: Response): Promise<any> => {
  try {
    const query = ((req.query.query as string) || "").trim(); // Convert input to lowercase

    if (!query) return res.status(400).json({ message: "No query provided" });

    // ✅ Fetch books from database based on query
    const filteredBooks = await Book.find({
      title: { $regex: query, $options: "i" }, // Case-insensitive search
    }).sort({ createdAt: -1 });

    return res.status(200).json({ filteredBooks });
  } catch (error) {
    console.error("Error searching books:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBookById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const bookId = req.params.id.trim();
    const getBookById = await Book.findById(bookId);
    if (!getBookById) {
      return res.status(404).json({ message: "Book not found" });
    }
   

    return res.status(200).json({ getBookById });
  } catch (error) {
    console.error("Error in getting books", error);
    return res.status(500).json({ message: "Cannot fetch a book" });
  }
};
// findByIdandUpdate
export const borrowBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, book_Id } = req.body;

    if (!userId || !book_Id) {
      return res.status(400).json({ message: "User ID and Book ID are required." });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Check if user already borrowed the book but allow borrowing again if returned
    const existingTransaction = await Transaction.findOne({
      student: userId,
      book: book_Id,
    }).sort({ borrowDate: -1 }); // Get the latest transaction

    if (existingTransaction && !existingTransaction.returnDate) {
      return res.status(400).json({ message: "You have already borrowed this book and have not returned it yet." });
    }

    // Check and update book availability in a single step
    const book = await Book.findOneAndUpdate(
      { _id: book_Id, available: true }, // Ensure book is available before updating
      { available: false, $inc: { totalBorrowers: 1 } }, // Mark as borrowed & increment count
      { new: true } // Return updated book
    );

    if (!book) {
      return res.status(400).json({ message: "Book is not available or not found." });
    }

    // Create the borrow transaction
    const borrowTransaction = await Transaction.create({
      student: userId,
      book: book_Id,
      borrowDate: new Date(),
      status: "borrowed",
    });

    // Populate student and book details for response
    const populatedTransaction = await Transaction.findById(borrowTransaction._id)
      .populate("student", "name email")
      .populate("book", "title author description image");

    return res.status(201).json({
      message: "Book borrowed successfully.",
      transaction: populatedTransaction,
    });

  } catch (error) {
    console.error("Borrow error:", error);
    return res.status(500).json({ message: "Server error.", error });
  }
};
//almost done with the system good job self all you have to do now is the search and the category and pagination and the design