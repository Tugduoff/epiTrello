import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const listId = getRouterParam(event, 'listId');

  console.info('Fetching cards from list with id:', listId);

  // Query to retrieve all the cards of the list
  const cards = await db.all('SELECT * FROM cards WHERE list_id = ?', listId);

  if (!cards) {
    return { status: 404, body: { message: `Cards not found for list: ${listId}` } };
  }

  console.log('Cards:', cards);

  return { status: 200, cards };
});
