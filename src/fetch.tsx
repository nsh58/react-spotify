const token = import.meta.env.VITE_SPOTIFY_TOKEN;

async function fetchWebApi(endpoint: string, method: string, body?: string): Promise<any> {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

export async function getTopTracks(): Promise<any> {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?limit=5', 'GET'
  )).items;
}

export async function getUserSavedAlbum(): Promise<any> {
  return (await fetchWebApi(
    'v1/me/albums?limit=50', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(topTracks);

const userSavedAlbums = await getUserSavedAlbum();
console.log(userSavedAlbums);

export default function UserSavedAlbums() {
  return (
    <div>
        <ul>
          {userSavedAlbums.map((userSavedAlbum: any) => {
            return (
              <li key={userSavedAlbum.added_at}>
                {userSavedAlbum.added_at}
                {userSavedAlbum.album.name}
                </li>
            )
          })}
        </ul>
    </div>
  )
}