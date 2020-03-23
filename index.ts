import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth';

// config env
dotenv.config();
const app = express();

// Middleware
// app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Import routes
app.use('/api/user', authRoute);

// Connect to DB
mongoose.connect(
  process.env.MONGO_URI as string,
  { useNewUrlParser: true },
  () => console.log('Connected to Mongodb...')
);

app.listen(PORT, () =>
  console.log(`Server is running on: http://localhost:${PORT}`)
);
