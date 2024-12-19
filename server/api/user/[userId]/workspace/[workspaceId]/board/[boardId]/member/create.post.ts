import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody } from 'h3';

interface AddMemberRequest {
  email: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<AddMemberRequest>(event);
  const { email } = body;
  const boardId = getRouterParam(event, 'boardId');

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

  // Check if the user is already a member of the board
  const existingMember = await db.get(
    'SELECT * FROM board_members WHERE board_id = ? AND user_id = ?',
    [boardId, user_id]
  );

  if (existingMember) {
    return { status: 400, error: 'User is already a member of the board' };
  }

  // Insert the new member into the board_members table
  await db.run(
    'INSERT INTO board_members (board_id, user_id) VALUES (?, ?)',
    [boardId, user_id]
  );

  // Retrieve the newly added member
  const newMember = await db.get(
    'SELECT * FROM board_members WHERE board_id = ? AND user_id = ?',
    [boardId, user_id]
  );

  return { status: 201, member: newMember };
});
