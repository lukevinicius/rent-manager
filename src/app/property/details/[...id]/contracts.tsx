'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { usePathname, useRouter } from 'next/navigation'
import { useToast } from '@chakra-ui/react'

interface contracts {
  id: string
  property: string
  customer: string
  status: boolean
  qtdPayments: string
}

export function PropertyContracts() {
  const router = useRouter()
  const toast = useToast()
  const pathname = usePathname()
  const [contracts, setContract] = useState<contracts[] | undefined>([])

  async function handleDeleteUser(contractId: string) {
    await api
      .delete('/contracts/delete-contract', {
        data: {
          contractId,
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
    async function getContracts() {
      const contracts = await api
        .post('/contracts/by-property', {
          propertyId: pathname.split('/').pop(),
        })
        .then((response) => {
          setContract(response.data)
        })

      return contracts
    }

    getContracts()
  }, [pathname])

  return (
    <div className="space-y-3 rounded-xl bg-zinc-800 text-zinc-50 laptop:space-y-5">
      <div className="overflow-x-auto">
        <table className="w-full rounded-xl bg-zinc-700">
          <thead className="border-b-[1px]">
            <tr className="text-center">
              <th className="p-3">Imóvel</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Status</th>
              <th className="p-3">Alugueis pagos</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody className="p-5">
            {contracts ? (
              contracts.map((contract) => (
                <tr key={contract.id} className="p-5 text-center">
                  <td className="p-3">{contract.property}</td>
                  <td className="p-3">{contract.customer}</td>
                  <td className="p-3">
                    {contract.status ? 'Finalizado' : 'Em andamento'}
                  </td>
                  <td className="p-3">{contract.qtdPayments}</td>
                  <td className="space-y-3 p-3">
                    <Button
                      size="sm"
                      className="w-full bg-yellow-600 font-bold hover:bg-yellow-700"
                      onClick={() => {
                        router.push(`/contracts/update/${contract.id}`)
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      className="w-full bg-red-600 font-bold hover:bg-red-700"
                      onClick={() => {
                        handleDeleteUser(contract.id)
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
