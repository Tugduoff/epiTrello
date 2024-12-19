import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const userId = getRouterParam(event, 'userId');

  console.info('Getting all workspaces of user with id:', userId);

  // Query to retrieve the workspace
  const workspaces = await db.all('SELECT * FROM workspaces WHERE owner_id = ?', userId);

  console.log('Workspaces:', workspaces); // of user

  // Find workspaces shared with the user
  const sharedWorkspaces = await db.all(
    'SELECT * FROM workspace_members WHERE user_id = ?',
    userId
  );

  console.log('Shared workspaces:', sharedWorkspaces);

  // Add shared workspaces to the list of workspaces
  for (const ws of sharedWorkspaces) {
    const workspace = await db.get('SELECT * FROM workspaces WHERE id = ?', ws.workspace_id);
    workspaces.push(workspace);
    console.log('Added shared workspace:', workspace);
  }

  if (!workspaces || workspaces.length === 0) {
    console.error('No workspace found for user with id:', userId);
    // If workspace isn't found, return a 404 response
    return { status: 404, message: 'No workspace found for user with id: ' + userId };
  }

  return { status: 200, workspaces };
});
