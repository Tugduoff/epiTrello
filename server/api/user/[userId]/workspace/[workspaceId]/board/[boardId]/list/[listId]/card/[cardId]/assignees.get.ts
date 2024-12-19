import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const cardId = getRouterParam(event, 'cardId');

  console.info('Fetching card assignees with id:', cardId);

  // Query to retrieve all the assignees of a card
  const assignees = await db.all('SELECT * FROM card_assignees WHERE card_id = ?', cardId);

  if (!assignees) {
    return { status: 404, body: { message: `Assignees not found for card: ${cardId}` } };
  }

  console.log('Assignees:', assignees);

  return { status: 200, assignees };
});
