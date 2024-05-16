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
        username: '0dbd0de894a54417ae3df350ff53a166',
        password: '6bcb6a6feef6481dabf645b6c3f384e5'
      }
    }
    const data = {
      grant_type: 'client_credentials'
    }

    return http.post<IAccessToken>('https://accounts.spotify.com/api/token', qs.stringify(data), headers)
  }
}
