'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { useToast } from '@chakra-ui/react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface contracts {
  id: string
  property: string
  customer: string
  status: boolean
  qtdPayments: string
}

export default function Contracts() {
  const router = useRouter()
  const toast = useToast()
  const [contracts, setContracts] = useState<contracts[] | undefined>([])

  async function handleDeleteContract(contractId: string) {
    await api
      .delete('/contracts/delete', {
        data: {
          contractId,
        },
      })
      .then(() => {
        toast({
          title: 'Contrato excluído com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })

        router.refresh()
      })
      .catch((error) => {
        toast({
          title: 'Erro ao excluir contrato',
          description: error.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
  }

  useEffect(() => {
    async function getContracts() {
      const contracts = await api.get('/contracts/fetch').then((response) => {
        setContracts(response.data)
      })

      return contracts
    }

    getContracts()
  }, [])

  return (
    <div className="m-3 space-y-3 rounded-xl bg-zinc-800 p-3 text-zinc-50 laptop:m-5 laptop:space-y-5 laptop:p-5">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Contratos</p>
        <Button
          className="bg-emerald-600 font-bold hover:bg-emerald-700"
          onClick={() => {
            router.push('/contracts/create')
          }}
        >
          Criar contrato
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full rounded-xl bg-zinc-700">
          <thead className="border-b-[1px]">
            <tr className="text-center">
              <th className="p-3 text-sm">Imóvel</th>
              <th className="p-3 text-sm">Cliente</th>
              <th className="p-3 text-sm">Status</th>
              <th className="p-3 text-sm">Alugueis pagos</th>
              <th className="p-3 text-sm">Ações</th>
            </tr>
          </thead>
          <tbody className="p-5">
            {contracts ? (
              contracts.map((contract) => (
                <tr key={contract.id} className="p-5 text-center">
                  <td className="p-3 text-sm">{contract.property}</td>
                  <td className="p-3 text-sm">{contract.customer}</td>
                  <td className="p-3 text-sm">
                    {contract.status ? 'Finalizado' : 'Em andamento'}
                  </td>
                  <td className="p-3 text-sm">{contract.qtdPayments}</td>
                  <td className="space-y-3 p-3">
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 font-bold hover:bg-blue-700"
                      onClick={() => {
                        router.push(`/contracts/${contract.id}`)
                      }}
                    >
                      Detalhes
                    </Button>
                    {/* <Button
                      size="sm"
                      className="w-full bg-yellow-500 font-bold hover:bg-yellow-600"
                      onClick={() => {
                        router.push(`/contracts/update/${contract.id}`)
                      }}
                    >
                      Editar
                    </Button> */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          className="w-full bg-red-600 font-bold hover:bg-red-700"
                        >
                          Excluir
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-zinc-900 text-zinc-50">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription className="text-zinc-50">
                            Esta ação ira apagar esse contrato e todos os
                            pagamentos referentes a ele.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-zinc-800">
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => {
                              handleDeleteContract(contract.id)
                            }}
                          >
                            Sim
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
