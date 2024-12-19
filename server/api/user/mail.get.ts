import { getDatabase } from '~/server/middleware/db';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event);
  const { email } = query;

  if (!email) {
    return {
      status: 400,
      error: 'Email query parameter is required',
    };
  }

  const db = await getDatabase();

  try {
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
      return {
        status: 404,
        error: 'User not found',
      };
    }

    return {
      status: 200,
      user,
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      status: 500,
      error: 'Internal Server Error',
    };
  }
});
