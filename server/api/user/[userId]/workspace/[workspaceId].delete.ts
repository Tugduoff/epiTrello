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
  
  try {
    await db.run('DELETE FROM workspaces WHERE id = ?', workspaceId);
    console.info('Workspace deleted with id:', workspaceId);
    return { status: 200, message: `Workspace with workspaceId ${workspaceId} deleted successfully` };
  } catch (error) {
    console.error('Failed to delete workspace:', error);
    return { status: 500, message: 'Error deleting workspace' };
  }
});
