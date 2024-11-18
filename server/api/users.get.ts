import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  
  console.info('Getting all users');

  // Query to get all users
  const users = await db.all('SELECT id, name, email, created_at FROM users');
  
  if (!users || users.length === 0) {
    console.error('No users found');
    // If no users are found, return a 404 response
    return { status: 404, message: 'No users found' };
  }

  console.log('Count:', users.length, 'Users:', users);

  // Return all users
  return { status: 200, users };
});
