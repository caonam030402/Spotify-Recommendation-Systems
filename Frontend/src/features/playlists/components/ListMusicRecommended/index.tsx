import { Ellipsis, ListMusic } from 'lucide-react'
import ItemMusicRecommended from '../ItemMusicRecommended'
import { playlistAPI } from '@/apis/playlist.api'
import { useQuery } from '@tanstack/react-query'

export default function ListMusicRecommended() {
  const { data: listMusicRecommended } = useQuery({
    queryKey: ['music'],
    queryFn: async () => {
      return await playlistAPI.getPlaylistRecommended({ playlist_id: '5EH902vV2mzzqBYxWjnuQi', k: 20 })
    }
  })
  console.log(listMusicRecommended?.data)
  return (
    <div className='p-5'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span>
            <ListMusic />
          </span>
          <span className='text-xl font-bold'>Recommended</span>
        </div>
        <Ellipsis />
      </div>
      <div className='mt-1'>Based on what's in this playlist</div>
      <div className='mt-4 overflow-y-auto'>
        {listMusicRecommended?.data.map((item, index) => (
          <ItemMusicRecommended key={item.album_name} music={item} index={index} />
        ))}
      </div>
    </div>
  )
}
