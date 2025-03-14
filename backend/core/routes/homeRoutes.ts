
import express from 'express'
import {home,Search,getBookById,borrowBook,Profile,myBooks} from '../controllers/homeControllers';
const router = express.Router();

router.get('/getAllBooks',home);
router.get("/Search",Search);
router.get("/getBookById/:id",getBookById);
router.post('/borrow', borrowBook);
router.get("/profile/:userId",Profile);
router.get("/borrowedBooks/:userId",myBooks);
export default router;