// server/db/config.js
import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'faqih',
    password: process.env.DB_PASSWORD || '06052003',
    database: process.env.DB_NAME || 'notes_app',
    port: process.env.DB_PORT || 5432,
  },
});

export default db;
