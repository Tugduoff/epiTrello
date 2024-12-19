import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const userId = getRouterParam(event, 'memberId');
  const workspaceId = getRouterParam(event, 'workspaceId');

  console.info('Removing member with id:', userId, 'from workspace with id:', workspaceId);

  // Query to check if the user is a member of the workspace
  const member = await db.get(
    'SELECT * FROM workspace_members WHERE workspace_id = ? AND user_id = ?',
    [workspaceId, userId]
  );

  if (!member) {
    console.error('Member not found in workspace');
    return { status: 404, body: { error: 'Member not found in workspace' } };
  }

  const result = await db.run(
    'DELETE FROM workspace_members WHERE workspace_id = ? AND user_id = ?',
    [workspaceId, userId]
  );

  if (result.changes === 0) {
    return { status: 404, body: { error: 'Error happened on member id: ' + userId + ' removal on workspace id: ' + workspaceId } };
  }

  return { status: 204 };
});
