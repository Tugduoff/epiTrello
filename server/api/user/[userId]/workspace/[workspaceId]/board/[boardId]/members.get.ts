import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const boardId = getRouterParam(event, 'boardId');

  const db = await getDatabase();

  const members = await db.all(
    'SELECT * FROM board_members WHERE board_id = ?',
    [boardId]
  );

  return { status: 200, members };
});
