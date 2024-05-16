import { playlistAPI } from '@/apis/playlist.api'
import { calculateTimeDifference, formatDuration } from '@/lib/utils'
import { ITrask } from '@/types/music.type'
import { useMutation } from '@tanstack/react-query'
import { Check, Play, Trash } from 'lucide-react'

interface IProps {
  trask: ITrask
  index: number
}

export default function ItemMusicAdded({ trask, index }: IProps) {
  const deleteItemMutation = useMutation({
    mutationFn: playlistAPI.deleteItemPlaylist,
    onSuccess: (data) => {
      console.log(data)
    }
  })

  const handleDeleteItem = (id: string) => {
    deleteItemMutation.mutate({
      snapshot_id: 'abc',
      tracks: [
        {
          uri: id
        }
      ]
    })
  }

  console.log(trask.track.album.images[2].url)
  return (
    <div className='hover:bg-gray-50/10 cursor-pointer transition-all group'>
      <div className='grid grid-cols-12 py-3 px-4 items-center text-sm text-gray-300'>
        <div className='col-span-1'>
          <span className='group-hover:hidden inline'>{index}</span>
          <Play className='group-hover:block hidden' width={15} fill='white' />
        </div>
        <div className='col-span-4 flex items-center gap-4'>
          <img className='w-10 h-10' src={trask.track.album.images[2].url} alt='' />
          <div className=''>
            <div className='font-bold text-[15px]'>{trask.track.name}</div>
            <div className='text-sm'>{trask.track.artists[0].name}</div>
          </div>
        </div>
        <div className='col-span-3'>{trask.track.album.name}</div>
        <div className='col-span-2'>{calculateTimeDifference(new Date(), new Date(trask.added_at))}</div>

        <div className='col-span-2 text-right justify-end flex items-center'>
          <div className='w-5 h-5 hidden group-hover:flex bg-green-500 rounded-full  items-center justify-center text-black mr-9'>
            <Check size={14} />
          </div>
          {formatDuration(trask.track.duration_ms)}
          <div className='w-5 ml-3'>
            <Trash onClick={() => handleDeleteItem(trask.track.uri)} size={15} className=' hidden group-hover:flex' />
          </div>
        </div>
      </div>
    </div>
  )
}
