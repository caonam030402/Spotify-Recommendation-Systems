import { authAPI } from '@/apis/auth.api'
import { Button } from '@/components/ui/button'
import { setAccessTokenToLS } from '@/lib/auth'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

export default function Intro() {
  const getTokenMutation = useMutation({
    mutationFn: authAPI.getAccessToken,
    onSuccess: (data) => {
      setAccessTokenToLS(data.data.access_token)
      console.log(data)
    }
  })

  const handleGetToken = () => {
    getTokenMutation.mutate()
  }

  return (
    <div className='flex items-center justify-center h-[100vh]'>
      <Button onClick={handleGetToken}>Continue!</Button>
    </div>
  )
}
