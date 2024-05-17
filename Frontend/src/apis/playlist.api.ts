import { http } from '@/configs/http'
import { IMusicRecommended, IPlaylist } from '@/types/music.type'

interface TBodyDelete {
  tracks: {
    uri: string
  }[]
  snapshot_id: string
}

export const playlistAPI = {
  getPlaylist() {
    return http.get<IPlaylist>(`playlists/5EH902vV2mzzqBYxWjnuQi`)
  },
  deleteItemPlaylist(body: TBodyDelete) {
    return http.delete(`playlists/5EH902vV2mzzqBYxWjnuQi/tracks`, { data: body })
  },
  getPlaylistRecommended(body: { playlist_id: string; k: number }) {
    return http.post<IMusicRecommended[]>(`http://127.0.0.1:8080/recommend_from_playlist`, body)
  }
}
