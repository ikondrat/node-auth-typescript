import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth';
import cardsRouter from './routes/cards';

// config env
dotenv.config();
const app = express();

// parse application/json
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Import routes
app.use('/api/user', authRoute);
app.use('/api/cards', cardsRouter);

// Connect to DB
process.env.MONGO_URI &&
  mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to Mongodb...')
  );

app.listen(PORT, () =>
  console.log(`Server is running on: http://localhost:${PORT}`)
);
