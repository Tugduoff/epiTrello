import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody, getRouterParam } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const userId = getRouterParam(event, 'userId');
  const workspaceId = getRouterParam(event, 'workspaceId');

  const { name, description } = await readBody(event);

  console.info('Updating workspace with owner_id:', userId, 'and workspaceId:', workspaceId);

  // Validate that name and email are provided
  if (!name) {
    return { status: 400, message: 'Name is required.' };
  }

  // Query to update the workspace
  const result = await db.run('UPDATE workspaces SET name = ?, description = ? WHERE id = ? AND owner_id = ?', [name, description, workspaceId, userId]);

  // Check if the update was successful
  if (result.changes === 0) {
    console.error('No workspace found with id:', workspaceId, 'and owner_id:', userId);
    return { status: 404, message: 'No workspace found with the provided id.' };
  }

  // Fetch the updated workspace to return
  const updatedWorkspace = await db.get('SELECT * FROM workspaces WHERE id = ? AND owner_id = ?', [workspaceId, userId]);

  console.log('Workspace updated:', updatedWorkspace);

  // Return the updated user
  return { status: 200, workspace: updatedWorkspace, message: 'Workspace updated successfully.' };
});
