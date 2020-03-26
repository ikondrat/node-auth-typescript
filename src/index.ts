import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import typeDefs from './data/typeDefs';
import resolvers from './data/resolvers';
import { User } from './model/User';

// config env
dotenv.config();

export type Context = {
  user?: User;
};

if (process.env.MONGO_URI) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }): Promise<Context> => {
      const token = req.headers.authorization;
      const context: Context = {};
      const secret = process.env.JWT_SECRET;

      if (token && secret) {
        try {
          const verified = jwt.verify(token, secret);
          context.user = verified as User;
          // eslint-disable-next-line no-empty
        } catch (err) {}
      }

      return context;
    },
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

// Connect to DB
process.env.MONGO_URI &&
  mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to Mongodb...')
  );
