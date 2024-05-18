import { playlistAPI } from '@/apis/playlist.api'
import SkeletonItem from '@/components/skeletonItem'
import { Input } from '@/components/ui/input'
import UseDebounce from '@/hooks/UseDebounce'
import { calculateTimeDifference } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { Play, X } from 'lucide-react'
import React from 'react'
import { BiSearch } from 'react-icons/bi'

export default function Search() {
  const [query, setQuery] = React.useState('')
  const debouncedQuery = UseDebounce(query, 900)

  const { data: listMusicRecommendedSearchQuery, isLoading } = useQuery({
    queryKey: ['search-music', debouncedQuery],
    queryFn: async () => {
      return await playlistAPI.getPlaylistRecommendedSearchQuery({ search_query: debouncedQuery, k: 20 })
    },
    enabled: !!debouncedQuery
  })

  const listMusic = listMusicRecommendedSearchQuery?.data
  return (
    <div className='p-6'>
      <div className='text-2xl mb-4 font-semibold'>Let's find something for your music</div>
      <div className='bg-zinc-700 items-center px-3 flex focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-md'>
        <BiSearch size={20} />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} className='h-12 border-none outline-none' />
        {query !== '' && <X onClick={() => setQuery('')} className='cursor-pointer' size={20} />}
      </div>
      <div className='mt-5'>
        <div className='grid grid-cols-12 py-4 border-b border-gray-50/25 px-4 mb-2'>
          <div className='col-span-1'>#</div>
          <div className='col-span-6'>Title</div>
          <div className='col-span-3'>Album</div>
          <div className='col-span-2'>Date added</div>
        </div>

        {(!listMusic || listMusic.length === 0) && !isLoading && <div>No result</div>}

        {isLoading && (
          <div className='space-y-4 mt-5'>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <SkeletonItem key={index} />
              ))}
          </div>
        )}

        <div>
          {listMusic?.map((item) => (
            <div className='hover:bg-gray-50/10 cursor-pointer transition-all group group rounded-md'>
              <div className='grid grid-cols-12 py-3 px-4 items-center text-sm text-gray-300'>
                <div className='col-span-1'>
                  <span className='group-hover:hidden inline'>{item.popularity}</span>
                  <Play className='group-hover:block hidden' width={15} fill='white' />
                </div>
                <div className='col-span-6 flex items-center gap-4'>
                  <img className='w-10 h-10' src={item.album_image} alt='' />
                  <div className=''>
                    <div className='font-bold text-[15px]'>{item.track_name}</div>
                    <div className='text-sm line-clamp-1'>{item.artist_name}</div>
                  </div>
                </div>
                <div className='col-span-3'>{item.album_name}</div>
                <div className='col-span-2'>
                  {calculateTimeDifference(new Date(), new Date(item.album_release_date))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
