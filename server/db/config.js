// server/db/config.js
import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'yourusername',
    password: process.env.DB_PASSWORD || 'yourpassword',
    database: process.env.DB_NAME || 'notes_app',
    port: process.env.DB_PORT || 5432,
  },
});

export default db;
