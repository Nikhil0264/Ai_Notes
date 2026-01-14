import express from 'express'
import { adminOnly, Protect } from '../middlewares/authMiddlewares.js';
import { allNotes } from '../controllers/userControllers.js';
import { getAllNotes } from '../controllers/noteControllers.js';

const userRouter = express.Router();

userRouter.get("/all_notes",Protect,getAllNotes)


export default userRouter;