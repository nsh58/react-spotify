import { format } from 'date-fns'

const token = sessionStorage.getItem('accessToken');

async function fetchWebApi(endpoint: string, method: string, body?: string): Promise<any> {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
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
    'v1/me/albums?limit=5', 'GET'
  )).items;
}

type AlbumImage = {
  height: number
  width: number
  url: string
}

type Album = {
  images: Array<AlbumImage> 
  name: string
}

type UserSavedAlbum = {
  added_at: string
  album: Album
}

const topTracks = await getTopTracks();

const userSavedAlbums = await getUserSavedAlbum();

export default function UserSavedAlbums() {
  return (
    <div>
      {userSavedAlbums.map((userSavedAlbum: UserSavedAlbum) => {
        return (
          <div className="ui card">
            <div className="image">
              <img src={userSavedAlbum.album.images[0].url} />
            </div>
            <div className="content">
              <a className="header">Kristy</a>
              <div className="meta">
                <span className="date">ライクした日{format(new Date(userSavedAlbum.added_at), 'yyyy/M/d')}</span>
              </div>
              <div className="description">
                Kristy is an art director living in New York.
              </div>
            </div>
            <div className="extra content">
              <a>
                <i className="user icon"></i>
                22 Friends
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}