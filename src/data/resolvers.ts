import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import UserModel, { User } from '../model/User';
import { validateRegistration } from '../validation';
import { UserInputError } from 'apollo-server';
import { Context } from '../';

const resolvers = {
  Query: {
    // fetch the profile of currently authenticated user
    async me<T = undefined, U = undefined>(
      _: T,
      args: U,
      { user }: Context
    ): Promise<User> {
      // make sure user is logged in
      if (!user) {
        throw new Error('You are not authenticated!');
      }
      // user is authenticated
      const userAlive = await UserModel.findById(user.id);
      if (!userAlive) {
        throw new Error('User is not found!');
      }
      return userAlive;
    },
  },

  Mutation: {
    async signup<T = undefined>(_: T, args: User): Promise<User> {
      const { error } = validateRegistration(args);
      const { name, email, password } = args;

      if (error) {
        throw new UserInputError(error?.details[0].message);
      }

      const user = await UserModel.findOne({ email });

      if (user) {
        throw new UserInputError('Email is already taken');
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = new UserModel({
        name,
        email,
        password: hash,
      });

      try {
        const savedUser = await newUser.save();
        return savedUser;
      } catch (err) {
        throw new UserInputError(err);
      }
    },
    // Handles user login
    async login<T = undefined>(
      _: T,
      { email, password }: Pick<User, 'email' | 'password'>
    ): Promise<string> {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new UserInputError('No user with that email');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new UserInputError('Incorrect password');
        }
        // return json web token
        return jsonwebtoken.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET as string,
          { expiresIn: '1d' }
        );
      } catch (err) {
        throw new UserInputError(err);
      }
    },
  },
};

export default resolvers;
