// server/db/schema.js
import db from './config.js';

// Create notes table if it doesn't exist
db.schema.hasTable('notes').then((exists) => {
  if (!exists) {
    return db.schema.createTable('notes', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('content').notNullable();
      table.timestamp('created_at').defaultTo(db.fn.now());
    });
  }
});
