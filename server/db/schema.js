// server/db/schema.js
import db from './config.js';

// Buat tabel notes jika belum ada
db.schema.hasTable('notes').then((exists) => {
  if (!exists) {
    return db.schema.createTable('notes', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('body').notNullable();
      table.timestamp('createdAt').defaultTo(db.fn.now());
    }).then(() => {
      console.log('Tabel notes berhasil dibuat');
    });
  } else {
    console.log('Tabel notes sudah ada');
  }
}).catch((error) => {
  console.error('Gagal membuat atau memeriksa tabel:', error);
});
