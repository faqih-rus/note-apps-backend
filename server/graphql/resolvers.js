// server/graphql/resolvers.js
import db from '../db/config.js';

export const resolvers = {
  Query: {
    getNotes: async () => {
      return await db('notes').select('*');
    },
    getNote: async (_, { id }) => {
      return await db('notes').where({ id }).first();
    },
  },
  Mutation: {
    addNote: async (_, { title, content }) => {
      const [newNote] = await db('notes')
        .insert({ title, content })
        .returning('*');
      return newNote;
    },
    updateNote: async (_, { id, title, content }) => {
      const [updatedNote] = await db('notes')
        .where({ id })
        .update({ title, content })
        .returning('*');
      return updatedNote;
    },
    deleteNote: async (_, { id }) => {
      const [deletedNote] = await db('notes').where({ id }).del().returning('*');
      return deletedNote;
    },
  },
};
