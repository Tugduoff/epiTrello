import { getDatabase } from '~/server/middleware/db';
import { hashPassword, generateToken } from '~/server/utils/auth';
import { H3Event, readBody } from 'h3';

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export const activeTokens: { email: string; token: string }[] = [];

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<SignupRequest>(event);
  const { name, email, password } = body;

  const db = await getDatabase();

  // Check if user already exists
  const existingUser = await db.get('SELECT * FROM users WHERE email = ?', email);
  if (existingUser) {
    return { status: 400, body: { error: 'User already exists' } };
  }

  // Hash the password (wrapped version with error handling)
  const { response: hashedPassword, err: hashErr } = await hashPassword(password);
  if (hashErr) {
    return { status: 500, body: { error: 'Failed to hash password' } };
  }

  // Insert the new user into the database
  await db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

  const newUser = await db.get('SELECT * FROM users WHERE email = ?', email);
  
  // Generate a token (wrapped version with error handling)
  const { response: token, err: tokenErr } = await generateToken(newUser);
  if (tokenErr) {
    return { status: 500, body: { error: 'Failed to generate token' } };
  }

  const definedToken: string = token as string;

  activeTokens.push({ email, token: definedToken });

  return { status: 201, body: { token, email, userId: newUser.id } };
});
