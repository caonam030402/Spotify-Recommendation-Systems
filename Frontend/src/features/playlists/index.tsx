import InfoUser from './components/InfoUser'
import ListMusicAdded from './components/ListMusicAdded'
import ListMusicRecommended from './components/ListMusicRecommended'
import { playlistAPI } from '@/apis/playlist.api'
import { useQuery } from '@tanstack/react-query'

export default function Playlists() {
  const query = useQuery({ queryKey: ['playlist'], queryFn: playlistAPI.getPlaylist })

  const trasks = query.data?.data.tracks.items

  return (
    <div className=''>
      <div className='flex-1 overflow-hidden'>
        <div className='px-6 bg-red-800 '>
          <InfoUser />
        </div>
        <div className=''>{trasks && <ListMusicAdded trasks={trasks} />}</div>
        <div className=''>
          <ListMusicRecommended />
        </div>
      </div>
    </div>
  )
}
