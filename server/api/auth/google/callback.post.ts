import { H3Event, readBody } from 'h3';
import { getDatabase } from '~/server/middleware/db';
import { generateToken } from '~/server/utils/auth';
import axios from 'axios';
import { useRuntimeConfig } from '#imports';

interface GoogleCallbackRequest {
  code: string;
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<GoogleCallbackRequest>(event);
  const { code } = body;

  const config = useRuntimeConfig();
  const db = await getDatabase();

  try {
    // console.log('Google OAuth code:', code);

    // Exchange the code for an access token using Axios
    const tokenResponse = await axios.post(config.private.googleTokenUri, new URLSearchParams({
      code,
      client_id: config.public.googleClientId,
      client_secret: config.private.googleClientSecret,
      redirect_uri: config.public.googleRedirectUri,
      grant_type: 'authorization_code',
    }).toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const tokenData = tokenResponse.data;

    if (!tokenData.access_token) {
      return { status: 400, body: { error: 'Failed to retrieve access token from Google' } };
    }

    // Fetch user info from Google using the access token with Axios
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const userInfo = userInfoResponse.data;

    if (!userInfo.email) {
      return { status: 400, body: { error: 'Failed to retrieve user info from Google' } };
    }

    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', userInfo.email);
    let newUser;
    if (!existingUser) {
      await db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
        userInfo.name,
        userInfo.email,
        null,
      ]);

      newUser = await db.get('SELECT * FROM users WHERE email = ?', userInfo.email);
    } else {
      newUser = existingUser;
    }

    const { response: token, err: tokenErr } = await generateToken(newUser);
    if (tokenErr) {
      return { status: 500, body: { error: 'Failed to generate token' } };
    }

    return { status: 201, body: { token } };

  } catch (error) {
    console.error('Error during Google OAuth process:', error);
    return { status: 500, body: { error: 'An error occurred during the authentication process' } };
  }
});
