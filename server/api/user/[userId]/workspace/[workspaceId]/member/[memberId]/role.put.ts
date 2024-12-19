import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const memberId = getRouterParam(event, 'memberId');
  const workspaceId = getRouterParam(event, 'workspaceId');

  const body = await readBody<{ role: string }>(event);
  const { role }: { role?: string } = body;

  if (!role) {
    return { status: 400, body: { error: 'Role is required for update' } };
  }

  const db = await getDatabase();

  const result = await db.run(
    'UPDATE workspace_members SET role = ? WHERE workspace_id = ? AND user_id = ?',
    [role, workspaceId, memberId]
  );

  if (result.changes === 0) {
    return { status: 404, body: { error: 'Member not found in workspace' } };
  }

  const updatedMember = await db.get(
    'SELECT * FROM workspace_members WHERE workspace_id = ? AND user_id = ?',
    [workspaceId, memberId]
  );

  return { status: 200, member: updatedMember };
});
