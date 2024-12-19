import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody } from 'h3';

interface AddMemberRequest {
  workspace_id: string;
  role?: string;
  email: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<AddMemberRequest>(event);
  const { email, role = 'member' } = body;
  const workspaceId = getRouterParam(event, 'workspaceId');

  if (!email) {
    return { status: 400, body: { error: 'Email is required' } };
  }

  const db = await getDatabase();

  // Check if the user exists
  const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

  if (!user) {
    return { status: 404, error: 'User not found' };
  }

  const user_id = user.id;

  // Check if the user is already a member of the workspace
  const existingMember = await db.get(
    'SELECT * FROM workspace_members WHERE workspace_id = ? AND user_id = ?',
    [workspaceId, user_id]
  );

  if (existingMember) {
    return { status: 400, error: 'User is already a member of the workspace' };
  }

  // Insert the new member into the workspace_members table
  await db.run(
    'INSERT INTO workspace_members (workspace_id, user_id, role) VALUES (?, ?, ?)',
    [workspaceId, user_id, role]
  );

  // Retrieve the newly added member
  const newMember = await db.get(
    'SELECT * FROM workspace_members WHERE workspace_id = ? AND user_id = ?',
    [workspaceId, user_id]
  );

  return { status: 201, member: newMember };
});
