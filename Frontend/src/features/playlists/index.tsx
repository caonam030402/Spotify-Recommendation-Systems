import React from 'react'
import Header from './components/Header'
import InfoUser from './components/InfoUser'
import ListMusicAdded from './components/ListMusicAdded'
import ListMusicRecommended from './components/ListMusicRecommended'
import { playlistAPI } from '@/apis/playlist.api'
import { useQuery } from '@tanstack/react-query'

export default function Playlists() {
  const query = useQuery({ queryKey: ['playlist'], queryFn: playlistAPI.getPlaylist })

  const trasks = query.data?.data.tracks.items

  return (
    <div className='flex'>
      <div className='flex-1'>
        <div className='px-6 bg-red-800'>
          <Header />
          <InfoUser />
        </div>
        <div className=''>{trasks && <ListMusicAdded trasks={trasks} />}</div>
      </div>

      <div className='w-[25%] sticky top-0 h-[100vh]'>
        <ListMusicRecommended />
      </div>
    </div>
  )
}
