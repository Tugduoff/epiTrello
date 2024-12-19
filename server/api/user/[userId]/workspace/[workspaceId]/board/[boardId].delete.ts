import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const userId = getRouterParam(event, 'userId');
  const boardId = getRouterParam(event, 'boardId');

  console.info('Getting board with id:', boardId, 'of user with id:', userId);

  // Query to retrieve the board
  const board = await db.get('SELECT * FROM boards WHERE id = ?', boardId);

  if (!board || board.length === 0) {
    console.error('No board found with id:', boardId, 'of user with id:', userId);
    // If board isn't found, return a 404 response
    return { status: 404, message: 'No board found with id: ' + boardId + ' of user with id: ' + userId };
  }

  try {
    await db.run('DELETE FROM boards WHERE id = ?', boardId);
    console.info('Workspace deleted with id:', boardId);
    return { status: 200, message: `Workspace with boardId ${boardId} deleted successfully` };
  } catch (error) {
    console.error('Failed to delete board:', error);
    return { status: 500, message: 'Error deleting board' };
  }
});
