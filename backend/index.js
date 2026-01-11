import express from 'express';
import { PORT } from './env.js';
import cors from 'cors';
import connectDB from './config.js/data.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.get("/", (req, res) => {
  res.send("Backend is running");
});
const startServer = (async () => {
  try {
    await connectDB();
    app.listen(3000, () =>
      console.log("Server running")
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

startServer();