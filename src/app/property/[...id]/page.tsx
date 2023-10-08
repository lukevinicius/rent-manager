'use client'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { api } from '@/lib/axios'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PropertyContracts } from './contracts'
import { useToast } from '@chakra-ui/react'

interface IProperty {
  name: string
  status: boolean
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  zip: string
}

export default function PropertyDetails() {
  const pathname = usePathname()
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [property, setProperty] = useState<IProperty>({} as IProperty)

  async function handleDeleteProperty() {
    await api
      .delete(`/property/delete`, {
        data: {
          propertyId: pathname.split('/').pop(),
        },
      })
      .then(() => {
        router.push('/property')
      })
      .catch((error) => {
        toast({
          title: 'Erro ao excluir imóvel',
          description: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })
      })
  }

  useEffect(() => {
    async function getProperty() {
      await api
        .post(`/property/by-id`, {
          id: pathname.split('/').pop(),
        })
        .then((response) => {
          setProperty(response.data)
          setLoading(false)
        })
    }

    getProperty()
  }, [pathname])
  return (
    <div className="m-3 space-y-3 rounded-xl bg-zinc-800 p-3 text-zinc-50 laptop:m-5 laptop:space-y-5 laptop:p-5">
      {loading ? (
        <div className="flex items-center justify-between border-b-[1px] pb-3">
          <p className="text-2xl font-bold">Carregando...</p>
        </div>
      ) : (
        <>
          <div className="laptop:flex laptop:space-x-3">
            <Skeleton className="h-52 w-52 rounded-xl border-b-[1px] pb-3 max-laptop:w-full" />
            <div className="w-full max-laptop:space-y-3 max-laptop:p-5 laptop:flex laptop:justify-between">
              <div>
                <p className="text-lg font-bold">Informações do imóvel:</p>
                <p>Imóvel: {property.name}</p>
                <p>Status: {property.status ? 'Alugado' : 'Não alugado'}</p>
              </div>
              <div>
                <p className="text-lg font-bold">Endereço:</p>
                <p>CEP: {property.zip}</p>
                <p>Esdado: {property.state}</p>
                <p>Cidade: {property.city}</p>
                <p>Bairro: {property.neighborhood}</p>
                <p>Rua: {property.street}</p>
                <p>Número: {property.number}</p>
              </div>
              <div className="flex flex-col space-y-3 laptop:w-1/6">
                <Button
                  className="w-full bg-yellow-500 font-bold hover:bg-yellow-600"
                  onClick={() => {
                    router.push(`/property/update/${pathname.split('/').pop()}`)
                  }}
                >
                  Editar
                </Button>
                <Button
                  className="w-full bg-red-600 font-bold hover:bg-red-700"
                  onClick={() => {
                    handleDeleteProperty()
                  }}
                >
                  Excluir
                </Button>
              </div>
            </div>
          </div>
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-1 bg-zinc-900 text-zinc-50">
              <TabsTrigger value="contracts">
                Contratos deste imóvel
              </TabsTrigger>
            </TabsList>
            <TabsContent value="contracts">
              <PropertyContracts />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
