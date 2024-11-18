import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const userId = getRouterParam(event, 'userId');
  const workspaceId = getRouterParam(event, 'workspaceId');

  console.info('Getting all boards of workspace:', workspaceId, 'of user with id:', userId);

  // Query to retrieve the workspace
  const boards = await db.all('SELECT * FROM boards WHERE workspace_id = ?', workspaceId);

  if (!boards || boards.length === 0) {
    console.error('No board found for user with id:', userId);
    // If board isn't found, return a 404 response
    return { status: 404, message: 'No board found for user with id: ' + userId + ' of workspace with id: ' + workspaceId };
  }

  console.log('Boards:', boards);

  return { status: 200, boards };
});
