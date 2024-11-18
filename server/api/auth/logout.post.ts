import { defineEventHandler, H3Event } from 'h3';
import { activeTokens } from './signup.post';

interface LogoutRequest {
  email: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const { email } = await readBody<LogoutRequest>(event);

  // Check if email and token are present in cookies
  if (!email) {
    return { status: 400, body: { error: 'Already disconnected' } };
  }

  // Remove the email-token combination from activeTokens
  const index = activeTokens.findIndex((entry) => entry.email === email);
  if (index > -1) {
    activeTokens.splice(index, 1);
  }

  return { status: 200, body: { message: 'Successfully logged out' } };
});
