import { Router } from 'express';
import User from '../model/User';
import bcrypt from 'bcryptjs';
import { validateRegistration } from '../validation';

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

router.post('/login');

router.get('/login', (req, res) => res.send('login'));

export default router;
