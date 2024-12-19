import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody } from 'h3';

interface CreateRequest {
  name: string;
  col: number;
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<CreateRequest>(event);
  const { name, col } = body;
  const boardId = getRouterParam(event, 'boardId');

  const db = await getDatabase();

  // Check if the list already exists
  const existingList = await db.get('SELECT * FROM lists WHERE board_id = ? AND name = ? AND column = ?', [boardId, name, col]);
  if (existingList) {
    return { status: 400, body: { error: 'List already exists' } };
  }

  // Insert the new list into the database
  await db.run('INSERT INTO lists (board_id, name, column) VALUES (?, ?, ?)', [boardId, name, col]);

  const newList = await db.get('SELECT * FROM lists WHERE board_id = ? AND name = ? AND column = ?', [boardId, name, col]);
  return { status: 201, list: newList };
});
