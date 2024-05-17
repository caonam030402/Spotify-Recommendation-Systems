import { authAPI } from '@/apis/auth.api'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { Bell, ChevronLeft, ChevronRight, Download } from 'lucide-react'
import React from 'react'

export default function Header() {
  const getTokenMutation = useMutation({
    mutationFn: authAPI.getAccessToken,
    onSuccess: (data) => {
      console.log(data)
    }
  })

  const handleGetToken = () => {
    getTokenMutation.mutate()
  }

  return (
    <div className='py-5 px-4 flex w-full items-center justify-between sticky top-0 bg-red-700/90  backdrop:blur-md'>
      <div className='flex gap-3'>
        <div className='w-10 h-10 bg-primary-foreground flex items-center justify-center rounded-full'>
          <ChevronLeft />
        </div>
        <div className='w-10 h-10 bg-primary-foreground flex items-center justify-center rounded-full'>
          <ChevronRight />
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Button className='h-10 rounded-full'>Explore Premium</Button>
        <Button
          onClick={handleGetToken}
          className='h-10 rounded-full space-x-1 bg-primary-foreground border text-white'
        >
          <span>
            <Download size={16} />
          </span>
          <span>Install App</span>
        </Button>
        <Button className='h-10 w-10 rounded-full p-2 bg-primary-foreground border text-white'>
          <Bell />
        </Button>
        <Button className='h-10 w-10 rounded-full p-0 overflow-hidden'>
          <img
            src='https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
            alt=''
          />
        </Button>
      </div>
    </div>
  )
}
