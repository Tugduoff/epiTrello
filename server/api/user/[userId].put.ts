import { getDatabase } from '~/server/middleware/db';
import { H3Event, readBody, getRouterParam } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const id = getRouterParam(event, 'userId');

  console.info('Updating user with id:', id);

  // Read the body of the request to get updated user data
  const body = await readBody(event);
  const { name, email } = body;

  // Validate that name and email are provided
  if (!name || !email) {
    return { status: 400, message: 'Name and email are required.' };
  }

  // Query to update the user
  const result = await db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);

  // Check if the update was successful
  if (result.changes === 0) {
    console.error('No user found or no changes made for id:', id);
    return { status: 404, message: 'No user found with id: ' + id };
  }

  // Fetch the updated user to return
  const updatedUser = await db.get('SELECT * FROM users WHERE id = ?', id);

  console.log('User updated:', updatedUser);

  // Return the updated user
  return { status: 200, user: updatedUser };
});
