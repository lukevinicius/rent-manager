import { IUser } from '@/containers/AuthProvider'
import { useContext, createContext } from 'react'

export interface SignInCredentials {
  username: string
  password: string
}

export interface UpdateContactForm {
  password: string
  email: string
  phone: string
}

export interface UpdatePasswordForm {
  oldPassword: string
  newPassword: string
}

interface AuthContextData {
  user: IUser | undefined
  isAuthenticated: boolean
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextData)

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
