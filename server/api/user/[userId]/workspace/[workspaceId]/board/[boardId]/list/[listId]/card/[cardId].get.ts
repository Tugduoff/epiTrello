import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const listId = getRouterParam(event, 'listId');
  const cardId = getRouterParam(event, 'cardId');

  console.info('Fetching card with id:', cardId);

  // Query to retrieve the card with the given id
  const card = await db.get('SELECT * FROM cards WHERE id = ? AND list_id = ?', [cardId, listId]);

  if (!card) {
    return { status: 404, body: { message: `Card: ${cardId} not found for list: ${listId}` } };
  }

  console.log('Card:', card);

  return { status: 200, card };
});
