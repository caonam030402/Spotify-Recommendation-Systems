import SizeNav from '@/components/sideNav'
import Header from '@/features/playlists/components/Header'
import React from 'react'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex '>
      <div className='w-[30%] h-[100vh] sticky top-0'>
        <SizeNav />
      </div>
      <div className='w-full'>
        <div className=' h-[100vh] overflow-y-auto w-full'>
          <Header />
          {children}
        </div>
      </div>
    </div>
  )
}
