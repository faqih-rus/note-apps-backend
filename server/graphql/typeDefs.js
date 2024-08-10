// server/graphql/typeDefs.js
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Note {
    id: ID!
    title: String!
    content: String!
    created_at: String!
  }

  type Query {
    getNotes: [Note]
    getNote(id: ID!): Note
  }

  type Mutation {
    addNote(title: String!, content: String!): Note
    updateNote(id: ID!, title: String, content: String): Note
    deleteNote(id: ID!): Note
  }
`;
