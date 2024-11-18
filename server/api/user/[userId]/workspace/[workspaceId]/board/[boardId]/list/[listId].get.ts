import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const boardId = getRouterParam(event, 'boardId');
  const listId = getRouterParam(event, 'listId');

  console.info('Fetching list with id:', listId);

  // Query to retrieve the list with the given id
  const list = await db.get('SELECT * FROM lists WHERE id = ? AND board_id = ?', [listId, boardId]);

  if (!list) {
    return { status: 404, body: { message: `List: ${listId} not found for board: ${boardId}` } };
  }

  console.log('List:', list);

  return { status: 200, list };
});
