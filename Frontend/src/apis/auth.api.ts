import { http } from '@/configs/http'
import { IAccessToken } from '@/types/auth.type'

import qs from 'qs'

export const authAPI = {
  getAccessToken() {
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: import.meta.env.VITE_CLIENT_ID as string,
        password: import.meta.env.VITE_CLIENT_SECRET as string
      }
    }
    const data = {
      grant_type: 'client_credentials'
    }

    return http.post<IAccessToken>('https://accounts.spotify.com/api/token', qs.stringify(data), headers)
  }
}
