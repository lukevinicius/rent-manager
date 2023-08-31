'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
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
  payments: {
    id: string
    status: boolean
    paymentValue: number
    paymentDate: Date
    createdAt: Date
    updatedAt: Date
  }[]
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
      <p className="text-xl font-bold">Pagamentos deste contrato</p>
      <div className="space-y-5 overflow-x-auto">
        <table className="w-full rounded-xl bg-zinc-700">
          <thead className="border-b-[1px]">
            <tr className="text-center">
              <th className="p-3">Criado em:</th>
              <th className="p-3">Valor</th>
              <th className="p-3">Dia do Pagamento</th>
              <th className="p-3">Status</th>
              <th className="p-3">Atualização</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="p-5">
            {contract?.payments ? (
              contract?.payments.map((payment) => (
                <tr key={payment.id} className="p-5 text-center">
                  <td className="p-3">
                    {dayjs(payment.createdAt).format('DD/MM/YYYY')}
                  </td>
                  <td className="p-3">
                    {payment.paymentValue.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td className="p-3">
                    {dayjs(payment.paymentDate).format('DD/MM/YYYY')}
                  </td>
                  <td className="p-3">
                    {payment.status ? (
                      <p className="rounded-full bg-green-500 p-1 text-zinc-50">
                        Pago
                      </p>
                    ) : dayjs().isAfter(payment.paymentDate) ? (
                      <p className="rounded-full bg-red-500 p-1 text-zinc-50">
                        Atrasado
                      </p>
                    ) : (
                      <p className="rounded-full bg-blue-500 p-1 text-zinc-50">
                        Em Aberto
                      </p>
                    )}
                  </td>
                  <td className="p-3">
                    {dayjs(payment.updatedAt)
                      .locale('pt-br')
                      .format('DD/MM/YYYY HH:MM:ss')}
                  </td>
                  <td className="space-y-3 p-3">
                    <Button className="w-full bg-green-600 font-bold hover:bg-green-700">
                      Pagar
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
