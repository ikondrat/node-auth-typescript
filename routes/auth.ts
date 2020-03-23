import { Router } from 'express';
import User from '../model/User';
import Joi from '@hapi/joi';
import bcrypt from 'bcryptjs';

const router = Router();

// Validation
const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.post('/register', async (req, res) => {
  // Validate
  const { error } = schema.validate(req.body);
  const { name, email, password } = req.body;

  if (error) {
    return res.status(400).send(error?.details[0].message);
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send('Email already exists');
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login');

router.get('/login', (req, res) => res.send('login'));

export default router;
