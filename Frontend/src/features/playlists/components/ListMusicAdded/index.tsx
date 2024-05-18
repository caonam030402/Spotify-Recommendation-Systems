import { Button } from '@/components/ui/button'
import { Clock, Ellipsis, List, PlayIcon } from 'lucide-react'
import ItemMusicAdded from '../ItemMusicAdded'
import { ITrask } from '@/types/music.type'
import SkeletonItem from '@/components/skeletonItem'

// const listMusic = [
//   {
//     id: 1,
//     image:
//       'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
//     name: 'It yours',
//     album: 'YOU',
//     artist: 'Ali Gatie',
//     dateAdded: '2 week ago',
//     duration: '3:00'
//   },
//   {
//     id: 2,
//     image:
//       'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
//     name: 'It yours',
//     album: 'YOU',
//     artist: 'Ali Gatie',
//     dateAdded: '2 week ago',
//     duration: '3:00'
//   },
//   {
//     id: 3,
//     image:
//       'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
//     name: 'It yours',
//     album: 'YOU',
//     artist: 'Ali Gatie',
//     dateAdded: '2 week ago',
//     duration: '3:00'
//   },
//   {
//     id: 4,
//     image:
//       'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
//     name: 'It yours',
//     album: 'YOU',
//     artist: 'Ali Gatie',
//     dateAdded: '2 week ago',
//     duration: '3:00'
//   },
//   {
//     id: 5,
//     image:
//       'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
//     name: 'It yours',
//     album: 'YOU',
//     artist: 'Ali Gatie',
//     dateAdded: '2 week ago',
//     duration: '3:00'
//   },
//   {
//     id: 6,
//     image:
//       'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
//     name: 'It yours',
//     album: 'YOU',
//     artist: 'Ali Gatie',
//     dateAdded: '2 week ago',
//     duration: '3:00'
//   },
//   {
//     id: 1,
//     image:
//       'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
//     name: 'It yours',
//     album: 'YOU',
//     artist: 'Ali Gatie',
//     dateAdded: '2 week ago',
//     duration: '3:00'
//   },
//   {
//     id: 2,
//     image:
//       'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
//     name: 'It yours',
//     album: 'YOU',
//     artist: 'Ali Gatie',
//     dateAdded: '2 week ago',
//     duration: '3:00'
//   },
//   {
//     id: 3,
//     image:
//       'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
//     name: 'It yours',
//     album: 'YOU',
//     artist: 'Ali Gatie',
//     dateAdded: '2 week ago',
//     duration: '3:00'
//   },
//   {
//     id: 4,
//     image:
//       'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
//     name: 'It yours',
//     album: 'YOU',
//     artist: 'Ali Gatie',
//     dateAdded: '2 week ago',
//     duration: '3:00'
//   },
//   {
//     id: 5,
//     image:
//       'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
//     name: 'It yours',
//     album: 'YOU',
//     artist: 'Ali Gatie',
//     dateAdded: '2 week ago',
//     duration: '3:00'
//   },
//   {
//     id: 6,
//     image:
//       'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
//     name: 'It yours',
//     album: 'YOU',
//     artist: 'Ali Gatie',
//     dateAdded: '2 week ago',
//     duration: '3:00'
//   }
// ]
interface IProps {
  trasks: ITrask[]
  isLoading: boolean
}

export default function ListMusicAdded({ trasks, isLoading }: IProps) {
  return (
    <div className='bg-gradient-to-b from-red-900/50 to-background p-6'>
      <div className='flex items-center justify-between '>
        <div className='flex items-center gap-7'>
          <Button className='rounded-full w-12 h-12 bg-green-400 hover:scale-105 transition hover:bg-green-300'>
            <PlayIcon fill='white' className='text-white' />
          </Button>
          <Ellipsis size={30} />
        </div>
        <div className='flex items-center gap-2'>
          <span>List</span>
          <span>
            <List />
          </span>
        </div>
      </div>
      <div className='grid grid-cols-12 py-4 border-b border-gray-50/25 px-4 mb-2'>
        <div className='col-span-1'>#</div>
        <div className='col-span-4'>Title</div>
        <div className='col-span-3'>Album</div>
        <div className='col-span-2'>Date added</div>
        <div className='col-span-2 text-right justify-end'>
          <Clock className='inline-block mr-7' />
        </div>
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

      <div>
        {trasks.map((item, index) => (
          <ItemMusicAdded trask={item} index={index + 1} key={index} />
        ))}
      </div>
    </div>
  )
}
