import { getDatabase } from '~/server/middleware/db';
import { verifyPassword, generateToken } from '~/server/utils/auth';
import { H3Event, readBody } from 'h3';

interface LoginRequest {
  email: string;
  password: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<LoginRequest>(event);
  const { email, password } = body;

  const db = await getDatabase();
  
  // Find user in the database
  const user = await db.get('SELECT * FROM users WHERE email = ?', email);
  if (!user) {
    return { status: 400, body: { error: 'Invalid credentials' } };
  }

  // Verify the password (wrapped version with error handling)
  const { response: isValid, err: verifyErr } = await verifyPassword(password, user.password);
  if (verifyErr || !isValid) {
    return { status: 400, body: { error: 'Invalid credentials' } };
  }

  // Generate a token (wrapped version with error handling)
  const { response: token, err: tokenErr } = await generateToken(user);
  if (tokenErr) {
    return { status: 500, body: { error: 'Failed to generate token' } };
  }

  return { status: 200, body: { token } };
});
