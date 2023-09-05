'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface IPropertys {
  id: string
  name: string
  address: {
    zip: string
    state: string
    city: string
    street: string
    number: string
  }
}

export default function PropertyList() {
  const router = useRouter()
  const [propertys, setPropertys] = useState<IPropertys[] | undefined>([])

  async function handleDeleteProperty(id: string) {
    const response = await api.delete(`/property/delete`, {
      params: {
        propertyId: id,
      },
    })

    if (response.status === 200) {
      await api.post('/property/fetch').then((response) => {
        setPropertys(response.data)
      })
    }
  }

  useEffect(() => {
    async function getPropertys() {
      const users = await api.post('/property/fetch').then((response) => {
        setPropertys(response.data)
      })

      return users
    }

    getPropertys()
  }, [])

  return (
    <div className="m-3 space-y-3 rounded-xl bg-zinc-800 p-3 text-zinc-50 laptop:m-5 laptop:space-y-5 laptop:p-5">
      <div className="flex items-center justify-between border-b-[1px] pb-3">
        <p className="text-2xl font-bold">Lista de imóveis do sistema</p>
        <Button
          className="bg-emerald-600 font-bold hover:bg-emerald-700"
          onClick={() => {
            router.push('/property/create')
          }}
        >
          Criar imóvel
        </Button>
      </div>
      <div className="space-y-5 overflow-x-auto rounded-xl bg-zinc-700 p-5">
        {propertys ? (
          propertys.map((property) => (
            <div
              className="max-laptop:space-y-5 laptop:flex laptop:justify-between"
              key={property.id}
            >
              <Skeleton className="h-36 w-52 rounded-xl max-laptop:w-full" />
              <p className="flex-1 text-2xl font-bold laptop:ml-5">
                {property.name}
              </p>
              <div className="flex flex-col space-y-3 laptop:w-1/6">
                <Button
                  className="w-full bg-blue-500 font-bold hover:bg-blue-600"
                  onClick={() => {
                    router.push(`/property/details/${property.id}`)
                  }}
                >
                  Detalhes
                </Button>
                <Button
                  className="w-full bg-yellow-500 font-bold hover:bg-yellow-600"
                  onClick={() => {
                    router.push(`/property/update/${property.id}`)
                  }}
                >
                  Editar
                </Button>
                <Button
                  className="w-full bg-red-600 font-bold hover:bg-red-700"
                  onClick={() => {
                    handleDeleteProperty(property.id)
                  }}
                >
                  Excluir
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div>Carregando...</div>
        )}
        {/* <table className="w-full rounded-xl bg-zinc-700">
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
            {propertys ? (
              propertys.map((property) => (
                <tr key={property.id} className="p-5 text-center">
                  <td className="p-3 text-sm">{property.name}</td>
                  <td className="p-3 text-sm">{property.address.city}</td>
                  <td className="p-3 text-sm">{property.address.city}</td>
                  <td className="p-3 text-sm">{property.address.city}</td>
                  <td className="space-y-3 p-3">
                    <Button
                      size="sm"
                      className="w-full bg-yellow-500 font-bold hover:bg-yellow-600"
                      onClick={() => {
                        router.push(`/property/update/${property.id}`)
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      className="w-full bg-red-600 font-bold hover:bg-red-700"
                      onClick={() => {
                        handleDeleteUser(property.id)
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
        </table> */}
      </div>
    </div>
  )
}
