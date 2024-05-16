import { getAccessTokenFromLS } from '@/lib/auth'
import axios, { type AxiosInstance } from 'axios'

class Http {
  private accessToken: string

  instance: AxiosInstance
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api.spotify.com/v1/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use((response) => {
      return response
    })
  }
}

export const http = new Http().instance
