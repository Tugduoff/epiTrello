import { defineEventHandler, H3Event } from 'h3';
import { activeTokens } from './signup.post';

interface TokenValidationRequest {
  email: string;
  token: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const { email, token } = await readBody<TokenValidationRequest>(event);

  // Check if email and token are present in cookies
  if (!email || !token) {
    return { status: 400, body: { error: 'Missing authentication details' } };
  }

  // Check if the email-token combination exists in activeTokens
  const isValid = activeTokens.some((entry) => entry.email === email && entry.token === token);

  if (!isValid) {
    return { status: 401, body: { error: 'Invalid token or email' } };
  }

  return { status: 200, body: { message: 'Token is valid' } };
});
