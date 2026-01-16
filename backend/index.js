import express from 'express';
import { CLINT, PORT } from './env.js';
import cors from 'cors';
import connectDB from './config/data.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import notesRouter from './routes/notesRoutes.js';

const app = express();
app.use(cors(
  {origin:CLINT
  },

));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api',notesRouter)

app.get("/", (req, res) => {
  res.send("Backend is running");
});
const startServer = (async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log("Server running")
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

startServer();