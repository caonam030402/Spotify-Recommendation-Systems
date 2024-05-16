import { Button } from '@/components/ui/button'
import { IMusic } from '@/types/music.type'

interface IProps {
  music: IMusic
  index: number
}

export default function ItemMusicRecommended({ music }: IProps) {
  return (
    <div className='hover:bg-gray-50/10 cursor-pointer transition-all group'>
      <div className='flex py-3 items-center text-sm text-gray-300 justify-between'>
        <div className='col-span-4 flex items-center gap-4'>
          <img className='w-10 h-10' src={music.image} alt='' />
          <div className=''>
            <div className='font-bold text-[15px]'>{music.name}</div>
            <div className='text-sm'>{music.artist}</div>
          </div>
        </div>
        <Button size='sm' className='rounded-full w-16 border-white p-2' variant='outline'>
          Add
        </Button>
      </div>
    </div>
  )
}
