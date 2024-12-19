import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const boardId = getRouterParam(event, 'boardId');

  console.info('Fetching board labels with id:', boardId);

  // Query to retrieve all the labels of a board
  const labels = await db.all('SELECT * FROM labels WHERE board_id = ?', boardId);

  if (!labels) {
    return { status: 404, body: { message: `Labels not found for board: ${boardId}` } };
  }

  console.log('Labels:', labels);

  return { status: 200, labels };
});
