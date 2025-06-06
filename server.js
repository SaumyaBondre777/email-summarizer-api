import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import summarizeRouter from './routes/summarize.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/summarize', summarizeRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
