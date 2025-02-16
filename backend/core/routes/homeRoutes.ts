import express from 'express'
import {home,Search} from '../controllers/homeControllers';
const router = express.Router();

router.get('/getAllBooks',home);
router.get("/Search",Search);

export default router;