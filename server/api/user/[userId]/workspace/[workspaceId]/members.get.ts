import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const workspaceId = getRouterParam(event, 'workspaceId');

  const db = await getDatabase();

  const members = await db.all(
    'SELECT * FROM workspace_members WHERE workspace_id = ?',
    [workspaceId]
  );

  return { status: 200, members };
});
