import { IUser } from '@/containers/AuthProvider'
import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : '/api',
})

async function refreshAccessToken() {
  const userStorage = sessionStorage.getItem('@office:user')

  if (!userStorage) {
    return
  }

  const user = JSON.parse(userStorage) as IUser

  const data = await api
    .post('/token/refresh', {
      refreshToken: user.refreshToken,
    })
    .then((response) => response.data)
    .catch(() => {
      window.location.replace('sign-in')
    })

  const newAccessToken = data.token
  const newRefreshToken = data.refreshToken

  await sessionStorage.setItem(
    '@office:user',
    JSON.stringify({
      ...user,
      refreshToken: newRefreshToken,
    }),
  )

  return newAccessToken
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const newAccessToken = await refreshAccessToken()

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      }
    }

    return Promise.reject(error)
  },
)
