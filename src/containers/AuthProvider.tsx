import { ReactNode, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { AuthContext, SignInCredentials } from '../hooks/useAuth'
import { api } from '@/lib/axios'
import { useToast } from '@chakra-ui/react'
// import { api } from '@/lib/api'

interface AuthProviderProps {
  children: ReactNode
}

export interface IUser {
  id: string
  name: string
  username: string
  email: string
  role: string
  token: string
  refreshToken: string
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const [user, setUser] = useState<IUser>({} as IUser)
  const userStorageKey = `@office:user`
  const isAuthenticated = !!user
  const toast = useToast()

  async function signIn(credentials: SignInCredentials) {
    try {
      const { data } = await api.post('/users/sign-in', {
        username: credentials.username,
        password: credentials.password,
      })

      const userLogged = {
        id: data.user.id,
        name: data.user.name,
        username: data.user.username,
        email: data.user.email,
        role: data.user.role,
        token: data.token,
        refreshToken: data.refreshToken,
      }

      setUser(userLogged)

      api.defaults.headers.Authorization = `Bearer ${data.token}`

      sessionStorage.setItem(userStorageKey, JSON.stringify(userLogged))

      toast({
        title: 'Bem vindo',
        description: `Olá ${userLogged.name}!`,
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      })

      router.push('/')
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: `Verifique suas credenciais!`,
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  async function signOut() {
    await sessionStorage.removeItem(userStorageKey)
    setUser({} as IUser)

    router.push('/sign-in')
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStoraged = await sessionStorage.getItem(userStorageKey)

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as IUser
        // api.defaults.headers.Authorization = `Bearer ${userLogged.token}`
        await setUser(userLogged)
      } else {
        router.push('/sign-in')
      }
    }

    loadUserStorageData()
  }, [userStorageKey, router])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
