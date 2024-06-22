import { cookies } from 'next/headers'
import { IUser } from '@/domain/interfaces/User'

export function useAuth() {
  const authCookie = cookies().get('session')?.value || '{}'
  const user: IUser = JSON.parse(authCookie)

  return { user }
}
