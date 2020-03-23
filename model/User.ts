import { Schema, model, Document } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

type User = {
  name: string;
  email: string;
  password: string;
  date: string;
} & Document;

export default model<User>('User', userSchema);
