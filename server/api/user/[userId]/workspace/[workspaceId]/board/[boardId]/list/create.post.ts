import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody } from 'h3';

interface CreateRequest {
  name: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<CreateRequest>(event);
  const { name } = body;
  const boardId = getRouterParam(event, 'boardId');

  const db = await getDatabase();

  // Check if the list already exists
  const existingList = await db.get('SELECT * FROM lists WHERE board_id = ? AND name = ?', [boardId, name]);
  if (existingList) {
    return { status: 400, body: { error: 'List already exists' } };
  }

  // Insert the new list into the database
  await db.run('INSERT INTO lists (board_id, name) VALUES (?, ?)', [boardId, name]);

  const newList = await db.get('SELECT * FROM lists WHERE board_id = ? AND name = ?', [boardId, name]);
  return { status: 201, list: newList };
});
