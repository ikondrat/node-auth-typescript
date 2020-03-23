import { Router } from 'express';
import User from '../model/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateRegistration, validateLogin } from '../validation';

const router = Router();

router.post('/register', async (req, res) => {
  const { error } = validateRegistration(req.body);
  const { name, email, password } = req.body;

  if (error) {
    return res.status(400).send(error?.details[0].message);
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send('Email already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hash,
  });

  try {
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error?.details[0].message);

  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Email or password is wrong');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password');

  if (!process.env.TOKEN_SECRET)
    return res.status(400).send('No secret defined');
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  res.header('auth-token', token).send(token);
  res.send('Logged in');
});

export default router;
