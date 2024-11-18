import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const boardId = getRouterParam(event, 'boardId');

  console.info('Fetching board lists with id:', boardId);

  // Query to retrieve all the lists of a board
  const lists = await db.all('SELECT * FROM lists WHERE board_id = ?', boardId);

  if (!lists) {
    return { status: 404, body: { message: `Lists not found for board: ${boardId}` } };
  }

  console.log('Lists:', lists);

  return { status: 200, lists };
});
