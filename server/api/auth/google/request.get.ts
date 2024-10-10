import { H3Event } from 'h3';
import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig();
  
  // console.log('Google Auth URI:', config.public.googleAuthUri);
  // console.log('Google Client ID:', config.public.googleClientId);
  // console.log('Google Redirect URI:', config.public.googleRedirectUri);

  const googleAuthUrl = new URL(config.public.googleAuthUri);

  googleAuthUrl.searchParams.append('response_type', 'code');
  googleAuthUrl.searchParams.append('client_id', config.public.googleClientId);
  googleAuthUrl.searchParams.append('redirect_uri', config.public.googleRedirectUri);
  googleAuthUrl.searchParams.append('scope', 'openid email profile');
  googleAuthUrl.searchParams.append('access_type', 'offline');
  googleAuthUrl.searchParams.append('prompt', 'consent');

  // console.log('Constructed Google Auth URL:', googleAuthUrl.toString());

  return { authUrl: googleAuthUrl.toString() };
});
