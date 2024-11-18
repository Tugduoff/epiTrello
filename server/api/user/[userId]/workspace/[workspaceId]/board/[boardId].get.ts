import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const userId = getRouterParam(event, 'userId');
  const workspaceId = getRouterParam(event, 'workspaceId');
  const boardId = getRouterParam(event, 'boardId');

  console.info('Fetching board with id:', boardId, 'of workspace with id:', workspaceId, 'of user with id:', userId);

  // Query to retrieve the board
  const board = await db.get('SELECT * FROM boards WHERE id = ? AND workspace_id = ?', boardId, workspaceId);

  if (!board || board.length === 0) {
    console.error('No board found with id:', boardId, 'of workspace with id:', workspaceId, 'of user with id:', userId);
    // If board isn't found, return a 404 response
    return { status: 404, message: 'No board found with id: ' + boardId + ' of workspace with id: ' + workspaceId + ' of user with id: ' + userId };
  }

  console.log('Board:', board);

  return { status: 200, board };
});
