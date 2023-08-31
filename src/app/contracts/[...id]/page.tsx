'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface IContract {
  id: string
  property: {
    id: string
    name: string
    address: {
      street: string
      number: string
      neighborhood: string
      city: string
      state: string
      zip: string
    }
  }
  customer: {
    name: string
    email: string
    phone: string
  }
  status: boolean
  qtdPayments: string
}

export default function ContractById() {
  const pathname = usePathname()
  const router = useRouter()
  const [contract, setContract] = useState<IContract | undefined>()

  useEffect(() => {
    async function getContracts() {
      const contracts = await api
        .post('/contracts/by-id', {
          contractId: pathname.split('/').pop(),
        })
        .then((response) => {
          setContract(response.data)
        })

      return contracts
    }

    getContracts()
  }, [pathname])

  return (
    <div className="m-3 space-y-3 rounded-xl bg-zinc-800 p-3 text-zinc-50 laptop:m-5 laptop:space-y-5 laptop:p-5">
      <div className="justify-between max-laptop:space-y-3 laptop:flex">
        <p className="text-xl font-bold">Contrato: {contract?.id}</p>
        <div className="max-laptop:space-y-3 laptop:flex laptop:space-x-3">
          <Button
            size="sm"
            className="w-full bg-yellow-500 font-bold hover:bg-yellow-500"
            onClick={() => {
              router.push(`/customers/update/${contract?.customer.name}`)
            }}
          >
            Editar
          </Button>
          <Button
            size="sm"
            className="w-full bg-red-500 font-bold hover:bg-red-600"
            onClick={() => {
              router.push(`/customers/update/${contract?.customer.name}`)
            }}
          >
            Excluir
          </Button>
        </div>
      </div>
      <div className="justify-between max-laptop:space-y-3 laptop:flex">
        <div className="space-y-2">
          <p className="text-lg font-bold">Dados do Contrato</p>
          <p>
            <strong>Alugueis Pagos: </strong> {contract?.qtdPayments}
          </p>
          <p>
            <strong>Status: </strong>{' '}
            {contract?.status ? 'Finalizado' : 'Em andamento'}
          </p>
          <p>
            <strong>Telefone: </strong> {contract?.customer.phone}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-bold">Dados do Imóvel</p>
          <p>
            <strong>Nome: </strong> {contract?.property.name}
          </p>
          <p>
            <strong>CEP: </strong> {contract?.property.address.zip}
          </p>
          <p>
            <strong>Estado: </strong> {contract?.property.address.state}
          </p>
          <p>
            <strong>Cidade: </strong> {contract?.property.address.city}
          </p>
          <p>
            <strong>Bairro: </strong> {contract?.property.address.neighborhood}
          </p>
          <p>
            <strong>Rua: </strong> {contract?.property.address.street}
          </p>
          <p>
            <strong>Número: </strong> {contract?.property.address.number}
          </p>
          <Button
            size="sm"
            className="w-full bg-blue-500 font-bold hover:bg-blue-600"
            onClick={() => {
              router.push(`/property/by-id/${contract?.property.id}`)
            }}
          >
            Mais informações
          </Button>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-bold">Dados do Cliente</p>
          <p>
            <strong>Nome: </strong> {contract?.customer.name}
          </p>
          <p>
            <strong>Email: </strong> {contract?.customer.email}
          </p>
          <p>
            <strong>Telefone: </strong> {contract?.customer.phone}
          </p>
          <Button
            size="sm"
            className="w-full bg-blue-500 font-bold hover:bg-blue-600"
            onClick={() => {
              router.push(`/customers/update/${contract?.customer.name}`)
            }}
          >
            Mais informações
          </Button>
        </div>
      </div>
    </div>
  )
}
