import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const cardId = getRouterParam(event, 'cardId');

  console.info('Getting card with id:', cardId);

  // Query to retrieve the card
  const card = await db.get('SELECT * FROM cards WHERE id = ?', cardId);

  if (!card || card.length === 0) {
    console.error('No card found with id:', cardId);
    // If card isn't found, return a 404 response
    return { status: 404, message: 'No card found with id: ' + cardId };
  }

  try {
    await db.run('DELETE FROM cards WHERE id = ?', cardId);
    console.info('Card deleted with id:', cardId);
    return { status: 200, message: `Card with id: ${cardId} deleted successfully` };
  } catch (error) {
    console.error('Failed to delete card:', error);
    return { status: 500, message: 'Error deleting card' };
  }
});
