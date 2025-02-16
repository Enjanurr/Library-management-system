import { Request, Response } from "express";
import { Book } from "../initializer/database"; // ✅ Ensure this is the correct path

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
   const query = (req.query.query as string || "").trim();// Convert input to lowercase

    if (!query) return res.status(400).json({ message: "No query provided" });

    // ✅ Fetch books from database based on query
    const filteredBooks = await Book.find({
      title: { $regex: query, $options: "i" }, // Case-insensitive search
    }).sort({ createdAt: -1});

    return res.status(200).json({filteredBooks});
  } catch (error) {
    console.error("Error searching books:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/*export const getListing = async (req: Request, res: Response): Promise<any> => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if ((offer = undefined || offer === "false")) {
      offer = { $in: [false, true] };
    }
    let furnished = req.query.furnished;
    if (furnished == undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }
  } catch (error) {}
};
*/