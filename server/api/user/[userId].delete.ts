import { getDatabase } from '~/server/middleware/db';
import { H3Event, sendError } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const db = await getDatabase();
  const id = getRouterParam(event, 'userId');

  console.info('Attempting to delete user with id:', id);

  // Ensure user exists before deleting
  const user = await db.get('SELECT * FROM users WHERE id = ?', id);

  if (!user) {
    console.error('User not found with id:', id);
    return { status: 404, message: 'No user found with id: ' + id };
  }

  // Delete the user from the database
  try {
    await db.run('DELETE FROM users WHERE id = ?', id);
    console.info('User deleted with id:', id);
    return { status: 200, message: `User with id ${id} deleted successfully` };
  } catch (error) {
    console.error('Failed to delete user:', error);
    return { status: 500, message: 'Error deleting user' };
  }
});
