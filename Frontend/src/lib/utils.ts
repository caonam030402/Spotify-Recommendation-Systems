import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateTimeDifference = (currentTime: Date, pastTime: Date) => {
  const difference = currentTime.getTime() - pastTime.getTime()

  const seconds = Math.floor(difference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const years = Math.floor(days / 365)

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`
  }
}

export const formatDuration = (durationMs: number) => {
  const totalSeconds = Math.floor(durationMs / 1000)

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  // Tạo chuỗi định dạng "phút:giây"
  const formattedDuration = `${formattedMinutes}:${formattedSeconds}`

  return formattedDuration
}
