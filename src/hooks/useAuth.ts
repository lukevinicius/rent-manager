import { IUser } from '@/domain/interfaces/User'
import { cookies } from 'next/headers'

export function useAuth() {
  const authCookie = cookies().get('session')?.value || '{}'
  const user: IUser = JSON.parse(authCookie)

  return { user }
}
