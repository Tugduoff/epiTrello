import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const cardId = getRouterParam(event, 'cardId');

  console.info('Fetching card labels with id:', cardId);

  // Query to retrieve all the labels of a card
  const labels = await db.all('SELECT * FROM card_labels WHERE card_id = ?', cardId);

  if (!labels) {
    return { status: 404, body: { message: `Labels not found for card: ${cardId}` } };
  }

  console.log('Labels:', labels);

  return { status: 200, labels };
});
