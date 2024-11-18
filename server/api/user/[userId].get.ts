import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const id = getRouterParam(event, 'userId');

  console.info('Getting user with id:', id);

  // Query to retrieve user
  const user = await db.get('SELECT * FROM users WHERE id = ?', id);

  if (!user || user.length === 0) {
    console.error('No user found with id:', id);
    // If user isn't found, return a 404 response
    return { status: 404, message: 'No user found with id: ' + id };
  }

  console.log('User:', user);

  // Return user
  return { status: 200, user };
});
