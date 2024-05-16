import { Ellipsis, ListMusic } from 'lucide-react'
import React from 'react'
import ItemMusicRecommended from '../ItemMusicRecommended'

const listMusic = [
  {
    id: 1,
    image:
      'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
    name: 'It yours',
    album: 'YOU',
    artist: 'Ali Gatie',
    dateAdded: '2 week ago',
    duration: '3:00'
  },
  {
    id: 2,
    image:
      'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
    name: 'It yours',
    album: 'YOU',
    artist: 'Ali Gatie',
    dateAdded: '2 week ago',
    duration: '3:00'
  },
  {
    id: 3,
    image:
      'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
    name: 'It yours',
    album: 'YOU',
    artist: 'Ali Gatie',
    dateAdded: '2 week ago',
    duration: '3:00'
  },
  {
    id: 4,
    image:
      'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
    name: 'It yours',
    album: 'YOU',
    artist: 'Ali Gatie',
    dateAdded: '2 week ago',
    duration: '3:00'
  },
  {
    id: 5,
    image:
      'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
    name: 'It yours',
    album: 'YOU',
    artist: 'Ali Gatie',
    dateAdded: '2 week ago',
    duration: '3:00'
  },
  {
    id: 6,
    image:
      'https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36',
    name: 'It yours',
    album: 'YOU',
    artist: 'Ali Gatie',
    dateAdded: '2 week ago',
    duration: '3:00'
  }
]

export default function ListMusicRecommended() {
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
      <div className='mt-4'>
        {listMusic.map((item, index) => (
          <ItemMusicRecommended key={item.id} music={item} index={index} />
        ))}
      </div>
    </div>
  )
}
