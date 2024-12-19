import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const boardId = getRouterParam(event, 'boardId');
  const listId = getRouterParam(event, 'listId');

  console.info('Attempting to delete list with id:', listId);

  // Check if the list exists
  const existingList = await db.get('SELECT * FROM lists WHERE id = ? AND board_id = ?', [listId, boardId]);

  if (!existingList) {
    return { status: 404, message: `List: ${listId} not found for board: ${boardId}` };
  }

  // Delete the list
  await db.run('DELETE FROM lists WHERE id = ? AND board_id = ?', [listId, boardId]);

  console.info('Deleted list:', listId);

  return { status: 200, message: `List: ${listId} successfully deleted from board: ${boardId}` };
});
