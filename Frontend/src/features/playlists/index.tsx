import React from 'react'
import Header from './components/Header'
import InfoUser from './components/InfoUser'
import ListMusicAdded from './components/ListMusicAdded'
import ListMusicRecommended from './components/ListMusicRecommended'

export default function Playlists() {
  return (
    <div className='flex'>
      <div className='flex-1'>
        <div className='px-6 bg-red-800'>
          <Header />
          <InfoUser />
        </div>
        <div className=''>
          <ListMusicAdded />
        </div>
      </div>

      <div className='w-[25%] sticky top-0 h-[100vh]'>
        <ListMusicRecommended />
      </div>
    </div>
  )
}
