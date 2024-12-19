import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody } from 'h3';

interface MemberRequest {
  workspace_id: string;
  user_id: string;
  role?: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<MemberRequest>(event);
  const { workspace_id, user_id, role } = body;

  if (!role) {
    return { status: 400, body: { error: 'Role is required for update' } };
  }

  const db = await getDatabase();

  const result = await db.run(
    'UPDATE workspace_members SET role = ? WHERE workspace_id = ? AND user_id = ?',
    [role, workspace_id, user_id]
  );

  if (result.changes === 0) {
    return { status: 404, body: { error: 'Member not found in workspace' } };
  }

  const updatedMember = await db.get(
    'SELECT * FROM workspace_members WHERE workspace_id = ? AND user_id = ?',
    [workspace_id, user_id]
  );

  return { status: 200, member: updatedMember };
});
