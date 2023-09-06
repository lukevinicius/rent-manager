'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { useToast } from '@chakra-ui/react'

interface ICustomers {
  id: string
  name: string
  cpf: string
  username: string
  email: string
  phone: string
  role: string
}

export default function Customers() {
  const router = useRouter()
  const toast = useToast()
  const [customers, setCustomers] = useState<ICustomers[] | undefined>([])

  async function handleDeleteCustomers(userId: string) {
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
    async function getCustomers() {
      const customers = await api
        .post('/users/fetch-users', {
          role: 'CUSTOMER',
        })
        .then((response) => {
          setCustomers(response.data)
        })

      return customers
    }

    getCustomers()
  }, [])

  return (
    <div className="m-3 space-y-3 rounded-t-xl bg-zinc-800 p-3 text-zinc-50 laptop:m-5 laptop:space-y-5 laptop:p-5">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Lista de clientes do sistema</p>
        <Button
          className="bg-emerald-600 font-bold hover:bg-emerald-700"
          onClick={() => {
            router.push('/customers/create')
          }}
        >
          Criar cliente
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full rounded-xl bg-zinc-700">
          <thead className="border-b-[1px]">
            <tr className="text-center">
              <th className="p-3 text-sm">Nome</th>
              <th className="p-3 text-sm">CPF</th>
              <th className="p-3 text-sm">Email</th>
              <th className="p-3 text-sm">Telefone</th>
              <th className="p-3 text-sm">Ações</th>
            </tr>
          </thead>
          <tbody className="p-5">
            {customers ? (
              customers.map((user) => (
                <tr key={user.id} className="p-5 text-center">
                  <td className="p-3 text-sm">{user.name}</td>
                  <td className="p-3 text-sm">{user.cpf}</td>
                  <td className="p-3 text-sm">{user.email}</td>
                  <td className="p-3 text-sm">{user.phone}</td>
                  <td className="space-y-3 p-3">
                    <Button
                      size="sm"
                      className="w-full bg-blue-500 font-bold hover:bg-blue-600"
                      onClick={() => {
                        router.push(`/customers/${user.id}`)
                      }}
                    >
                      Detalhes
                    </Button>
                    <Button
                      size="sm"
                      className="w-full bg-yellow-500 font-bold hover:bg-yellow-600"
                      onClick={() => {
                        router.push(`/customers/update/${user.id}`)
                      }}
                    >
                      Editar
                    </Button>
                    {/* <Button
                      size="sm"
                      className="w-full bg-red-600 font-bold hover:bg-red-700"
                      onClick={() => {
                        handleDeleteCustomers(user.id)
                      }}
                    >
                      Excluir
                    </Button> */}
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
