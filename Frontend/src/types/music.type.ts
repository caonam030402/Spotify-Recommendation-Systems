export interface IMusic {
  id: number
  image: string
  name: string
  album: string
  artist: string
  dateAdded: string
  duration: string
}

export interface IPlaylist {
  id: string
  name: string
  images: {
    url: string
    height: number
  }[]
  owner: {
    display_name: string
  }
  tracks: {
    items: ITrask[]
  }
}

export interface ITrask {
  added_at: string
  added_by: {
    href: string
    id: string
    type: string
    uri: string
  }

  track: {
    album: {
      images: {
        height: number
        url: string
        width: number
      }[]
      name: string
    }
    artists: IArtist[]
    duration_ms: number
    href: string
    id: string
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
  }
}

interface IArtist {
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface IMusicRecommended {
  track_name: string
  album_image: string
  artist_name: string
  album_name: string
  album_release_date: string
  duration_ms: number
  popularity: number
}
