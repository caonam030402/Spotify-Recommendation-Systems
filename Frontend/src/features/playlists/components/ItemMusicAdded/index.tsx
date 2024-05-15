import { IMusic } from '@/types/music.type'
import { Check, Play, Trash } from 'lucide-react'

interface IProps {
  music: IMusic
}

export default function ItemMusicAdded({ music }: IProps) {
  return (
    <div className='hover:bg-gray-50/10 cursor-pointer transition-all group'>
      <div className='grid grid-cols-12 py-3 px-4 items-center text-sm text-gray-300'>
        <div className='col-span-1'>
          <span className='group-hover:hidden inline'>{music.id}</span>{' '}
          <Play className='group-hover:block hidden' width={15} fill='white' />
        </div>
        <div className='col-span-4 flex items-center gap-4'>
          <img className='w-10 h-10' src={music.image} alt='' />
          <div className=''>
            <div className='font-bold text-[15px]'>{music.name}</div>
            <div className='text-sm'>{music.artist}</div>
          </div>
        </div>
        <div className='col-span-3'>{music.album}</div>
        <div className='col-span-2'>{music.dateAdded}</div>

        <div className='col-span-2 text-right justify-end flex items-center'>
          <div className='w-5 h-5 hidden group-hover:flex bg-green-500 rounded-full  items-center justify-center text-black mr-9'>
            <Check size={14} />
          </div>
          {music.duration}
          <div className='w-5 ml-3'>
            <Trash size={15} className=' hidden group-hover:flex' />
          </div>
        </div>
      </div>
    </div>
  )
}
