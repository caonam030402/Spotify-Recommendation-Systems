import React from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { GoHomeFill } from 'react-icons/go'
import { ListMusic, Plus } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const listPlaylist = [
  {
    name: 'Ml Cao Nam',
    image: 'https://i.scdn.co/image/ab67706c0000da84e1c7e0f7f8d6f1d7a9e2a8b6',
    user: 'Cao nam',
    link: '/playlists/5EH902vV2mzzqBYxWjnuQi'
  },
  {
    name: 'Ml Quốc Việt',
    image: 'https://i.scdn.co/image/ab67706c0000da84e1c7e0f7f8d6f1d7a9e2a8b6',
    user: 'Cao nam',
    link: '/playlists/5EH902vV2mzzqBYxWjnuQi2'
  }
]

const listNavbar = [
  {
    name: 'Home',
    icon: <GoHomeFill size={20} />,
    link: '/home'
  },
  {
    name: 'Search',
    icon: <RiSearchLine size={20} />,
    link: '/search'
  }
]

export default function SizeNav() {
  return (
    <div className='h-full bg-zinc-900 text-zinc-400'>
      <div className=' text-[18px]  border-b pb-4 p-4 flex flex-col gap-4 '>
        {listNavbar.map((item, index) => {
          return (
            <NavLink
              to={item.link}
              key={index}
              className={(active) => {
                return active.isActive ? 'text-white font-bold' : 'text-zinc-400 font-semibold'
              }}
            >
              <div className='flex items-center gap-2 '>
                {item.icon}
                <p>{item.name}</p>
              </div>
            </NavLink>
          )
        })}
      </div>
      <div>
        <div className='p-2'>
          <div className='flex items-center justify-between gap-3 p-2'>
            <div className='flex gap-3'>
              <ListMusic />
              <span className='text-md font-bold'>Your library</span>
            </div>
            <Plus />
          </div>
          {listPlaylist.map((item, index) => (
            <NavLink
              to={item.link}
              key={index}
              className={(active) => {
                return active.isActive ? 'text-green-400' : 'text-white'
              }}
            >
              <div className='flex mt-2 gap-3 w-full hover:bg-gray-500/10 p-2'>
                <img
                  className='w-12 h-12'
                  src='https://mosaic.scdn.co/640/ab67616d00001e02121a9af58f3604f78dd68f6bab67616d00001e0213584782bb6d165483d296edab67616d00001e0250a744f0ef5c3e260d9de720ab67616d00001e02e19d9c548f323ab0f0299d36'
                  alt=''
                />
                <div>
                  <div className='font-bold '>{item.name}</div>
                  <div className='text-sm opacity-85 text-white'>{item.user}</div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}
