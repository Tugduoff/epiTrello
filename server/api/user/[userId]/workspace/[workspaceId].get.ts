import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const userId = getRouterParam(event, 'userId');
  const workspaceId = getRouterParam(event, 'workspaceId');

  console.info('Getting workspace with id:', workspaceId, 'of user with id:', userId);

  // Query to retrieve the workspace
  const workspace = await db.get('SELECT * FROM workspaces WHERE id = ? AND owner_id = ?', workspaceId, userId);

  if (!workspace || workspace.length === 0) {
    console.error('No workspace found with id:', workspaceId, 'of user with id:', userId);
    // If workspace isn't found, return a 404 response
    return { status: 404, message: 'No workspace found with id: ' + workspaceId + ' of user with id: ' + userId };
  }

  console.log('Workspace:', workspace);

  return { status: 200, workspace };
});
