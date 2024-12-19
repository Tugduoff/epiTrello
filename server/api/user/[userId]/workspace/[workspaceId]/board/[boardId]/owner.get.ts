import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const userId = getRouterParam(event, 'userId');

  const db = await getDatabase();

  // Get the owner profile

  const owner = await db.get('SELECT * FROM users WHERE id = ?', userId);
  if (!owner) {
    return { status: 404, error: `User not found: ${userId}` };
  }

  return { status: 200, owner };
});
