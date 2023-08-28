import { ReactNode, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import {
  AuthContext,
  SignInCredentials,
  UpdateContactForm,
  UpdatePasswordForm,
} from '../hooks/useAuth'
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
      console.log(error)
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

  async function updateUserContact({
    password,
    email,
    phone,
  }: UpdateContactForm) {
    await api
      .put(`/user/update-contact`, {
        userId: user.id,
        password,
        email,
        phone,
      })
      .then(async () => {
        setUser({
          ...user,
          email,
        })

        await sessionStorage.setItem(
          userStorageKey,
          JSON.stringify({
            ...user,
            email,
            phone,
          }),
        )

        /* toast({
          title: 'Dados atualizados com sucesso.',
          description: `Seus dados foram atualizados com sucesso`,
          status: 'success',
          position: 'top',
          duration: 5000,
          isClosable: true,
        }) */
      })
      .catch(() => {
        /* toast({
          title: 'Erro ao atualizar usuário.',
          description: `${err.response.data.message}`,
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true,
        }) */
      })
  }

  async function updateUserPassword({
    oldPassword,
    newPassword,
  }: UpdatePasswordForm) {
    await api
      .put(`/user/update-password`, {
        userId: user.id,
        oldPassword,
        newPassword,
      })
      .then(() => {
        /* toast({
          title: 'Dados atualizados com sucesso.',
          description: `Seus dados foram atualizados com sucesso`,
          status: 'success',
          position: 'top',
          duration: 5000,
          isClosable: true,
        }) */
      })
      .catch(() => {
        /* toast({
          title: 'Erro ao atualizar usuário.',
          description: `${err.response.data.message}`,
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true,
        }) */
      })
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
        updateUserContact,
        updateUserPassword,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
