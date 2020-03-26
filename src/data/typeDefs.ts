import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: String!
    name: String!
    password: String
    email: String
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String
  }
`;

export default typeDefs;
