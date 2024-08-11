import db from '../db/config.js';
import { format } from 'date-fns';

export const resolvers = {
  Query: {
    getNotes: async () => {
      const notes = await db('notes').select('*');
      return notes.map(note => ({
        ...note,
        created_at: format(new Date(note.created_at), 'yyyy-MM-dd HH:mm:ss'),
      }));
    },
    getNote: async (_, { id }) => {
      const note = await db('notes').where({ id }).first();
      return {
        ...note,
        created_at: format(new Date(note.created_at), 'yyyy-MM-dd HH:mm:ss'),
      };
    },
  },
  Mutation: {
    addNote: async (_, { title, content }) => {
      const [newNote] = await db('notes')
        .insert({ title, content })
        .returning('*');
      return {
        ...newNote,
        created_at: format(new Date(newNote.created_at), 'yyyy-MM-dd HH:mm:ss'),
      };
    },
    updateNote: async (_, { id, title, content }) => {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        throw new Error('Invalid note ID');
      }
      const [updatedNote] = await db('notes')
        .where({ id: numericId })
        .update({ title, content })
        .returning('*');
      if (!updatedNote) {
        throw new Error('Note not found');
      }
      return {
        ...updatedNote,
        created_at: format(new Date(updatedNote.created_at), 'yyyy-MM-dd HH:mm:ss'),
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
        create_at:format(new Date(deletedNote.created_at), 'yyyy-MM-dd HH:mm:ss'),
      }
    },
  },
};