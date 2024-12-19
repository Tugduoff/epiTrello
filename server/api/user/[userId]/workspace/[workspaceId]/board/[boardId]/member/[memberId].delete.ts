import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const userId = getRouterParam(event, 'memberId');
  const boardId = getRouterParam(event, 'boardId');

  console.info('Removing member with id:', userId, 'from board with id:', boardId);

  // Query to check if the user is a member of the board
  const member = await db.get(
    'SELECT * FROM board_members WHERE board_id = ? AND user_id = ?',
    [boardId, userId]
  );

  if (!member) {
    console.error('Member not found in board');
    return { status: 404, body: { error: 'Member not found in board' } };
  }

  const result = await db.run(
    'DELETE FROM board_members WHERE board_id = ? AND user_id = ?',
    [boardId, userId]
  );

  if (result.changes === 0) {
    return { status: 404, body: { error: 'Error happened on member id: ' + userId + ' removal on board id: ' + boardId } };
  }

  return { status: 204 };
});
