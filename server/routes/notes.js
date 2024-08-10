// server/routes/notes.js
import express from 'express';
import db from '../db/config.js';

const router = express.Router();

// GET all notes
router.get('/', async (req, res) => {
  const notes = await db('notes').select('*');
  res.json(notes);
});

// GET a single note by ID
router.get('/:id', async (req, res) => {
  const note = await db('notes').where({ id: req.params.id }).first();
  res.json(note);
});

// POST a new note
router.post('/', async (req, res) => {
  const [newNote] = await db('notes').insert(req.body).returning('*');
  res.status(201).json(newNote);
});

// PUT (update) a note by ID
router.put('/:id', async (req, res) => {
  const [updatedNote] = await db('notes').where({ id: req.params.id }).update(req.body).returning('*');
  res.json(updatedNote);
});

// DELETE a note by ID
router.delete('/:id', async (req, res) => {
  const [deletedNote] = await db('notes').where({ id: req.params.id }).del().returning('*');
  res.json(deletedNote);
});

export default router;
