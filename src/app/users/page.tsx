'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { useToast } from '@chakra-ui/react'

interface users {
  id: string
  name: string
  username: string
  email: string
  role: string
}

export default function Users() {
  const router = useRouter()
  const toast = useToast()
  const [users, setUsers] = useState<users[] | undefined>([])

  async function handleDeleteUser(userId: string) {
    await api
      .delete('/users/delete-user', {
        data: {
          userId,
        },
      })
      .then(() => {
        toast({
          title: 'Usuário excluído com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })

        router.refresh()
      })
      .catch((error) => {
        toast({
          title: 'Erro ao excluir usuário',
          description: error.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
  }

  useEffect(() => {
    async function getUsers() {
      const users = await api
        .post('/users/fetch-users', {
          role: 'ADMIN',
        })
        .then((response) => {
          setUsers(response.data)
        })

      return users
    }

    getUsers()
  }, [])

  return (
    <div className="m-3 space-y-3 rounded-xl bg-zinc-800 p-3 text-zinc-50 laptop:m-5 laptop:space-y-5 laptop:p-5">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Lista de usuários do sistema</p>
        <Button
          className="bg-emerald-600 font-bold hover:bg-emerald-700"
          onClick={() => {
            router.push('/users/create')
          }}
        >
          Criar usuário
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full rounded-xl bg-zinc-700">
          <thead className="border-b-[1px]">
            <tr className="text-center">
              <th className="p-3 text-sm">Nome</th>
              <th className="p-3 text-sm">Usuário</th>
              <th className="p-3 text-sm">Email</th>
              <th className="p-3 text-sm">Função</th>
              <th className="p-3 text-sm">Ações</th>
            </tr>
          </thead>
          <tbody className="p-5">
            {users ? (
              users.map((user) => (
                <tr key={user.id} className="p-5 text-center">
                  <td className="p-3 text-sm">{user.name}</td>
                  <td className="p-3 text-sm">{user.username}</td>
                  <td className="p-3 text-sm">{user.email}</td>
                  <td className="p-3 text-sm">{user.role}</td>
                  <td className="space-y-3 p-3">
                    <Button
                      size="sm"
                      className="w-full bg-yellow-500 font-bold hover:bg-yellow-600"
                      onClick={() => {
                        router.push(`/users/update/${user.id}`)
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      className="w-full bg-red-600 font-bold hover:bg-red-700"
                      onClick={() => {
                        handleDeleteUser(user.id)
                      }}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center">Carregando...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
