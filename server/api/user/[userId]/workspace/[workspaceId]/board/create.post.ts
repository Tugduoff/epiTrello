import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody } from 'h3';

interface CreateRequest {
  workspace_id: string;
  name: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<CreateRequest>(event);
  const { workspace_id, name } = body;

  const db = await getDatabase();

  // Check if board already exists
  const existingBoard = await db.get('SELECT * FROM boards WHERE workspace_id = ? AND name = ?', [workspace_id, name]);
  if (existingBoard) {
    return { status: 400, body: { error: 'Board already exists' } };
  }

  // Insert the new board into the database
  await db.run('INSERT INTO boards (workspace_id, name) VALUES (?, ?)', [workspace_id, name]);

  const newBoard = await db.get('SELECT * FROM boards WHERE workspace_id = ? AND name = ?', [workspace_id, name]);

  return { status: 201, board: newBoard };
});
