import db from '../db/config.js';
import { format } from 'date-fns';

export const resolvers = {
  Query: {
    getNotes: async () => {
      const notes = await db('notes').select('*');
      return notes.map(note => ({
        ...note,
        createdAt: format(new Date(note.createdAt), 'yyyy-MM-dd HH:mm:ss'),
      }));
    },
    getNote: async (_, { id }) => {
      const note = await db('notes').where({ id }).first();
      return {
        ...note,
        createdAt: format(new Date(note.createdAt), 'yyyy-MM-dd HH:mm:ss'),
      };
    },
  },
  Mutation: {
    addNote: async (_, { title, body }) => {
      const [newNote] = await db('notes')
      .insert({ title, body, createdAt: new Date() })
        .returning('*');
      return {
        ...newNote,
        createdAt: format(new Date(newNote.createdAt), 'yyyy-MM-dd HH:mm:ss'),
      };
    },
    updateNote: async (_, { id, title, body }) => {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        throw new Error('Invalid note ID');
      }
      const [updatedNote] = await db('notes')
        .where({ id: numericId })
        .update({ title, body })
        .returning('*');
      if (!updatedNote) {
        throw new Error('Note not found');
      }
      return {
        ...updatedNote,
        createdAt: format(new Date(updatedNote.createdAt), 'yyyy-MM-dd HH:mm:ss'),
      }
    },
    deleteNote: async (_, { id }) => {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        throw new Error('Invalid note ID');
      }
      const [deletedNote] = await db('notes').where({ id: numericId }).del().returning('*');
      if (!deletedNote) {
        throw new Error('Note not found');
      }
      return {
        ...deletedNote,
        createdAt:format(new Date(deletedNote.createdAt), 'yyyy-MM-dd HH:mm:ss'),
      }
    },
  },
};