import { IPlaylist } from '@/types/music.type'
import React from 'react'

export default function InfoUser({ data }: { data: IPlaylist | undefined }) {
  return (
    <div className='flex items-center gap-8 py-6'>
      <img className='w-48' src={data?.images[0].url} alt='' />
      <div className=''>
        <span>Playlist</span>
        <div className='text-[60px] font-bold'>{data?.name}</div>
        <div>
          <span>
            <img src='' alt='' />
            <span>Cao Nam, 19 song, 1hr 3min</span>
          </span>
        </div>
      </div>
    </div>
  )
}
