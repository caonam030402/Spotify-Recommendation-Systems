import { Ellipsis, ListMusic } from 'lucide-react'
import ItemMusicRecommended from '../ItemMusicRecommended'
import { playlistAPI } from '@/apis/playlist.api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import SkeletonItem from '@/components/skeletonItem'

export default function ListMusicRecommended() {
  const { id } = useParams()
  const { data: listMusicRecommended, isLoading } = useQuery({
    queryKey: ['music', id],
    queryFn: async () => {
      return await playlistAPI.getPlaylistRecommended({ playlist_id: id as string, k: 20 })
    }
  })

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
      {isLoading && (
        <div className='space-y-4 mt-5'>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <SkeletonItem key={index} />
            ))}
        </div>
      )}
    </div>
  )
}
