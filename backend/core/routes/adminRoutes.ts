import express from "express";
import {
  addBook,
  getAllBooks,
  removeBook,
  updateBook
} from "../controllers/adminControllers";
import authenticateAdmin from "../middlewares/authenticateAdmin";

const router = express.Router();

router.post("/addBooks", addBook);
router.get("/getAllBooks", getAllBooks);
router.delete("/removeBook/:id", removeBook);
router.patch("/updateBook/:id",updateBook);
export default router;
