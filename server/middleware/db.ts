import { readFileSync } from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
// @ts-ignore
import { open } from 'sqlite';

export async function getDatabase() {
  const dbName = process.env.DB_NAME || 'database';
  const dbPath = path.join(process.cwd(), `${dbName}.db`);

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  return db;
}

async function executeSql(db: { exec: (sql: string) => Promise<void>; }, sql: string) {
  try {
    await db.exec(sql);
  } catch (err) {
    console.error('Error executing SQL:', err);
  }
}

export default defineEventHandler(async (_) => {
  try {
    const db = await getDatabase();

    // console.log('Connected to SQLite.');

    const schemaPath = path.join(process.cwd(), 'public', 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');

    const statements = schema.split(';').map(s => s.trim()).filter(s => s.length > 0);

    for (const statement of statements) {
      if (statement.startsWith('CREATE TABLE')) {
        const match = statement.match(/CREATE TABLE (\w+)/);
        if (match) {
          const tableName = match[1];
          const tableExists = await db.get(
            `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`
          );
          if (tableExists) {
            // console.log(`Table ${tableName} already exists. Skipping creation.`);
            continue;
          }
        }
      } else if (statement.startsWith('CREATE INDEX')) {
        const match = statement.match(/CREATE INDEX (\w+)/);
        if (match) {
          const indexName = match[1];
          const indexExists = await db.get(
            `SELECT name FROM sqlite_master WHERE type='index' AND name='${indexName}'`
          );
          if (indexExists) {
            // console.log(`Index ${indexName} already exists. Skipping creation.`);
            continue;
          }
        }
      }
      await executeSql(db, statement);
    }
    // console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
});
