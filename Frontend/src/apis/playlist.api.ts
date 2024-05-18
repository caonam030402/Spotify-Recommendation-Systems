import { http } from '@/configs/http'
import { IMusicRecommended, IPlaylist } from '@/types/music.type'

interface TBodyDelete {
  tracks: {
    uri: string
  }[]
  snapshot_id: string
}

export const playlistAPI = {
  getPlaylist(id: string) {
    return http.get<IPlaylist>(`playlists/${id}`)
  },
  deleteItemPlaylist(body: TBodyDelete) {
    return http.delete(`playlists/5EH902vV2mzzqBYxWjnuQi/tracks`, { data: body })
  },
  getPlaylistRecommended(body: { playlist_id: string; k: number }) {
    return http.post<IMusicRecommended[]>(`http://127.0.0.1:8080/api/recommend_from_playlist/`, body)
  },

  getPlaylistRecommendedSearchQuery(body: { search_query: string; k: number }) {
    return http.post<IMusicRecommended[]>(`http://127.0.0.1:8080/api/recommend_based_on_search_query/`, body)
  }
}
