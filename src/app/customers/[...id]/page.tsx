'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface IUser {
  id: string
  name: string
  cpf: string
  email: string
  phone: string
  customerInfo: {
    isRenter: boolean
    lastAddress: {
      zip: string
      state: string
      city: string
      neighborhood: string
      street: string
      number: string
    }
  }
  createdAt: string
  updatedAt: string
}

export default function UserById() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<IUser | undefined>(undefined)

  useEffect(() => {
    async function getUsers() {
      const users = await api
        .post('/users/customer-by-id', {
          userId: pathname.split('/').pop(),
        })
        .then((response) => {
          setUser(response.data)
        })

      return users
    }

    getUsers()
  }, [pathname])

  return (
    <div className="m-3 space-y-3 rounded-xl bg-zinc-800 p-3 text-zinc-50 laptop:m-5 laptop:space-y-5 laptop:p-5">
      <div className="justify-between max-laptop:space-y-3 laptop:flex">
        <p className="text-xl font-bold">Cliente: {user?.name}</p>
        <div className="max-laptop:space-y-3 laptop:flex laptop:space-x-3">
          <Button
            size="sm"
            className="w-full bg-yellow-500 font-bold hover:bg-yellow-500"
            onClick={() => {
              router.push(`/customers/update/${user?.id}`)
            }}
          >
            Editar
          </Button>
          {/* <Button
            size="sm"
            className="w-full bg-red-500 font-bold hover:bg-red-600"
            onClick={() => {
              router.push(`/customers/update/${user?.name}`)
            }}
          >
            Excluir
          </Button> */}
        </div>
      </div>
      <div className="justify-between max-laptop:space-y-3 laptop:flex">
        <div className="space-y-2">
          <p className="text-lg font-bold">Dados do Cliente</p>
          <p>
            <strong>CPF: </strong> {user?.cpf}
          </p>
          <p>
            <strong>Email: </strong> {user?.email}
          </p>
          <p>
            <strong>Telefone: </strong> {user?.phone}
          </p>
          <p>
            <strong>Se era alugado: </strong>{' '}
            {user?.customerInfo.isRenter ? 'Sim' : 'Não'}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-bold">Dados do ultimo endereço</p>
          <p>
            <strong>CEP: </strong> {user?.customerInfo.lastAddress.zip}
          </p>
          <p>
            <strong>Estado: </strong> {user?.customerInfo.lastAddress.state}
          </p>
          <p>
            <strong>Cidade: </strong> {user?.customerInfo.lastAddress.city}
          </p>
          <p>
            <strong>Bairro: </strong>
            {user?.customerInfo.lastAddress.neighborhood}
          </p>
          <p>
            <strong>Rua: </strong> {user?.customerInfo.lastAddress.street}
          </p>
          <p>
            <strong>N°: </strong> {user?.customerInfo.lastAddress.number}
          </p>
        </div>
      </div>
    </div>
  )
}
