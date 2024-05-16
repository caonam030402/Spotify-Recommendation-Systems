import { http } from '@/configs/http'
import { IPlaylist } from '@/types/music.type'

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
  }
}
