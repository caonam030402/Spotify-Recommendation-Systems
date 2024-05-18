import { useParams } from 'react-router-dom'
import InfoUser from './components/InfoUser'
import ListMusicAdded from './components/ListMusicAdded'
import ListMusicRecommended from './components/ListMusicRecommended'
import { playlistAPI } from '@/apis/playlist.api'
import { useQuery } from '@tanstack/react-query'

export default function Playlists() {
  const { id } = useParams()

  const query = useQuery({
    queryKey: ['playlist', id],
    queryFn: () => {
      return playlistAPI.getPlaylist(id as string)
    }
  })

  const isLoading = query.isLoading

  const trasks = query.data?.data.tracks.items

  const data = query.data?.data

  return (
    <div className=''>
      <div className='flex-1 overflow-hidden'>
        <div className='px-6 bg-red-800 '>
          <InfoUser data={data} />
        </div>
        <div className=''>{trasks && <ListMusicAdded query={query} trasks={trasks} />}</div>
        <div className=''>
          <ListMusicRecommended />
        </div>
      </div>
    </div>
  )
}
