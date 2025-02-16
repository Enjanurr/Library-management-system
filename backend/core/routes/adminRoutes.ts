import express from "express";
import {
  addBook,
  getAllBooks,
  removeBook,
} from "../controllers/adminControllers";

const router = express.Router();

router.post("/addBooks", addBook);
router.get("/getAllBooks", getAllBooks);
router.delete("/removeBook/:id", removeBook);
export default router;
