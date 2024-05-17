import { Button } from '@/components/ui/button'
import { IMusicRecommended } from '@/types/music.type'

interface IProps {
  music: IMusicRecommended
  index: number
}

export default function ItemMusicRecommended({ music, index }: IProps) {
  return (
    <div className='hover:bg-gray-50/10 cursor-pointer transition-all group rounded-md'>
      <div className='grid grid-cols-12 p-6 py-3 items-center text-sm text-gray-300  justify-between'>
        <div className='col-span-1'>{index}</div>
        <div className='col-span-4 flex items-center gap-4'>
          <img className='w-10 h-10' src={music.album_image} alt='' />
          <div className=''>
            <div className='font-bold text-[15px]'>{music.track_name}</div>
            <div className='text-sm'>{music.artist_name}</div>
          </div>
        </div>
        <div className='flex items-center justify-between col-span-7'>
          <div className='col-span-4 flex items-center gap-4'>
            <div className='text-[15px]'>{music.album_name}</div>
          </div>
          <Button size='sm' className='rounded-full w-16 border-white p-2' variant='outline'>
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
