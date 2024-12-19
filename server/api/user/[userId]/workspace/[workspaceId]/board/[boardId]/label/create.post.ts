import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody } from 'h3';

interface CreateRequest {
  name: string;
  color: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<CreateRequest>(event);
  const { name, color } = body;
  const boardId = getRouterParam(event, 'boardId');

  const db = await getDatabase();

  // Check if the label already exists
  const existingLabel = await db.get('SELECT * FROM labels WHERE board_id = ? AND name = ?', [boardId, name]);
  if (existingLabel) {
    return { status: 400, error: 'Label already exists' };
  }

  // Insert the new label into the database
  await db.run('INSERT INTO labels (board_id, name, color) VALUES (?, ?, ?)', [boardId, name, color]);

  const newLabel = await db.get('SELECT * FROM labels WHERE board_id = ? AND name = ?', [boardId, name]);
  return { status: 201, label: newLabel };
});
