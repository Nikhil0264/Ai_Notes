import express from 'express';
import { adminOnly, Protect } from '../middlewares/authMiddlewares.js';
import { allNotes } from '../controllers/userControllers.js';
import { uploadNotes } from '../controllers/noteControllers.js';
import upload from '../middlewares/multer.js';
import { chatWithAi } from '../controllers/aiControllers.js';
const notesRouter = express.Router();

notesRouter.post("/upload_notes",Protect,adminOnly,upload.single("file"),uploadNotes)
notesRouter.post("/chat",Protect,chatWithAi)
export default notesRouter;