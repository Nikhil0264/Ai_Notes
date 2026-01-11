import express from 'express'
import { adminOnly, Protect } from '../middlewares/authMiddlewares.js';
import { allNotes } from '../controllers/userControllers.js';
import { uploadNotes } from '../controllers/noteControllers.js';
import upload from '../middlewares/multer.js';
const userRouter = express.Router();

userRouter.get("/all_notes",Protect,allNotes)


export default userRouter;