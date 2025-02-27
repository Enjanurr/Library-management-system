import express from 'express'
import {home,Search,getBookById,borrowBook} from '../controllers/homeControllers';
const router = express.Router();

router.get('/getAllBooks',home);
router.get("/Search",Search);
router.get("/getBookById/:id",getBookById);
router.post('/borrow', borrowBook);
export default router;