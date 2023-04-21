import axios from 'axios'
import { Buffer } from 'buffer';

export default function SpotifyLoginButton () {
    const scopes = ['streaming', 'user-read-email', 'user-read-private', 'playlist-modify-public', 'playlist-modify-private'];
    const url  = new URL('https://accounts.spotify.com/authorize');
    url.searchParams.append('client_id', import.meta.env.VITE_CLIENT_ID);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('redirect_uri', 'http://localhost:5173/');
    url.searchParams.append('scope', scopes.join(' '));
    url.searchParams.append('state', 'state');
    return (
      <a href={url.href}>
        Sign in with Spotify
      </a>
    )
  }

  const authorize = async () => {
    
    const code = '';

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code as string);
    params.append('redirect_uri', 'http://localhost:5173/' as string);

    const response = await axios.post<any>(
        'https://accounts.spotify.com/api/token',
        params,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`, 'utf-8').toString('base64')}`
            }
        }
    );

    console.log(response);
};

authorize();