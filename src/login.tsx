export default function SpotifyLoginButton () {
    const scopes = [
      'streaming', 
      'user-read-email', 
      'user-read-private', 
      'playlist-modify-public', 
      'playlist-modify-private', 
      'user-top-read',
      'user-library-read',
    ];
    const url  = new URL('https://accounts.spotify.com/authorize');
    url.searchParams.append('client_id', import.meta.env.VITE_CLIENT_ID);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('redirect_uri', import.meta.env.VITE_SPOTIFY_CALLBACK);
    url.searchParams.append('scope', scopes.join(' '));
    url.searchParams.append('state', 'state');
    return (
      <a href={url.href}>
        Sign in with Spotify
      </a>
    )
  }