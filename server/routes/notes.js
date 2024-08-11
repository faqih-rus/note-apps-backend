import express from 'express';
import db from '../db/config.js';
import { format } from 'date-fns';

const router = express.Router();

// GET all notes
router.get('/notes', async (req, res) => {
  try {
    const notes = await db('notes').select('*');
    const formattedNotes = notes.map(note => ({
      ...note,
      createdAt: note.createdAt ? format(new Date(note.createdAt), 'yyyy-MM-dd HH:mm:ss') : null,
    }));
    res.json(formattedNotes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a single note by ID
router.get('/notes/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid note ID' });
    }
    const note = await db('notes').where({ id }).first();
    if (note) {
      const formattedNote = {
        ...note,
        created_at: note.createdAt ? format(new Date(note.createdAt), 'yyyy-MM-dd HH:mm:ss') : null,
      };
      res.json(formattedNote);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new note
router.post('/notes', async (req, res) => {
  try {
    const [newNote] = await db('notes')
      .insert({ 
        title: req.body.title, 
        body: req.body.body, 
        createdAt: db.fn.now() 
      })
      .returning('*');
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT (update) a note by ID
router.put('/notes/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid note ID' });
    }
    const [updatedNote] = await db('notes')
      .where({ id })
      .update({ 
        title: req.body.title, 
        body: req.body.body 
      })
      .returning('*');
    if (updatedNote) {
      res.json(updatedNote);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a note by ID
router.delete('/notes/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid note ID' });
    }
    const [deletedNote] = await db('notes')
      .where({ id })
      .del()
      .returning('*');
    if (deletedNote) {
      res.json(deletedNote);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
