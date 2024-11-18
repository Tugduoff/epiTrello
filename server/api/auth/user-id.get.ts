import { defineEventHandler, H3Event } from 'h3';
import { getDatabase } from '~/server/middleware/db';

interface UserIdRequest {
  email: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery<UserIdRequest>(event);
  const email = query.email;
  const db = await getDatabase();

  // Check if email and token are present in cookies
  if (!email) {
    return { status: 400, body: { error: 'Missing user id request details' } };
  }

  // Find user in the database
  const user = await db.get('SELECT * FROM users WHERE email = ?', email);
  if (!user) {
    return { status: 400, body: { error: 'Invalid credentials' } };
  }

  // Get the user id
  const id = user.id;

  return { status: 200, body: { id, message: 'Token is valid' } };
});
