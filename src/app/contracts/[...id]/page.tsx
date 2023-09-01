'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RiArticleFill, RiContactsFill, RiHome2Fill } from 'react-icons/ri'

interface IContract {
  id: string
  rentDeposit: number
  readjustment: number
  rentValue: number
  startDate: Date
  endDate: Date
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
    id: string
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
        {/* <div className="max-laptop:space-y-3 laptop:flex laptop:space-x-3">
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
        </div> */}
      </div>
      <div className="justify-between max-laptop:space-y-3 laptop:flex">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RiArticleFill />
            <p className="text-lg font-bold">Dados do Contrato</p>
          </div>
          <p className="text-sm">
            <strong>Alugueis Pagos: </strong> {contract?.qtdPayments}
          </p>
          <p className="text-sm">
            <strong>Status: </strong>{' '}
            {contract?.status ? 'Finalizado' : 'Em andamento'}
          </p>
          <p className="text-sm">
            <strong>Valor do Calção: </strong>{' '}
            {contract?.rentDeposit.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <p className="text-sm">
            <strong>Valor do Aluguel: </strong>{' '}
            {contract?.rentValue.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <p className="text-sm">
            <strong>Reajuste: </strong> {contract?.readjustment} %
          </p>
          <p className="text-sm">
            <strong>Data de inicio do contrato: </strong>{' '}
            {dayjs(contract?.startDate).format('DD/MM/YYYY')}
          </p>
          <p className="text-sm">
            <strong>Data final do contrato: </strong>{' '}
            {dayjs(contract?.endDate).format('DD/MM/YYYY')}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RiHome2Fill />
            <p className="text-lg font-bold">Dados do Imóvel</p>
          </div>
          <p className="text-sm">
            <strong>Nome: </strong> {contract?.property.name}
          </p>
          <p className="text-sm">
            <strong>CEP: </strong> {contract?.property.address.zip}
          </p>
          <p className="text-sm">
            <strong>Estado: </strong> {contract?.property.address.state}
          </p>
          <p className="text-sm">
            <strong>Cidade: </strong> {contract?.property.address.city}
          </p>
          <p className="text-sm">
            <strong>Bairro: </strong> {contract?.property.address.neighborhood}
          </p>
          <p className="text-sm">
            <strong>Rua: </strong> {contract?.property.address.street}
          </p>
          <p className="text-sm">
            <strong>Número: </strong> {contract?.property.address.number}
          </p>
          <Button
            size="sm"
            className="w-full bg-blue-500 font-bold hover:bg-blue-600"
            onClick={() => {
              router.push(`/property/${contract?.property.id}`)
            }}
          >
            Mais informações
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RiContactsFill />
            <p className="text-lg font-bold">Dados do Cliente</p>
          </div>

          <p className="text-sm">
            <strong>Nome: </strong> {contract?.customer.name}
          </p>
          <p className="text-sm">
            <strong>Email: </strong> {contract?.customer.email}
          </p>
          <p className="text-sm">
            <strong>Telefone: </strong> {contract?.customer.phone}
          </p>
          <Button
            size="sm"
            className="w-full bg-blue-500 font-bold hover:bg-blue-600"
            onClick={() => {
              router.push(`/customers/${contract?.customer.id}`)
            }}
          >
            Mais informações
          </Button>
        </div>
      </div>
      <p className="text-lg font-bold">Pagamentos deste contrato</p>
      <div className="space-y-3 overflow-x-auto">
        <table className="w-full rounded-xl bg-zinc-700">
          <thead className="border-b-[1px]">
            <tr className="text-center">
              <th className="p-3 text-sm">Criado em:</th>
              <th className="p-3 text-sm">Valor</th>
              <th className="p-3 text-sm">Dia do Pagamento</th>
              <th className="p-3 text-sm">Status</th>
              <th className="p-3 text-sm">Atualização</th>
              <th className="p-3 text-sm"></th>
            </tr>
          </thead>
          <tbody className="p-5">
            {contract?.payments ? (
              contract?.payments.map((payment) => (
                <tr key={payment.id} className="p-5 text-center">
                  <td className="p-3 text-sm">
                    {dayjs(payment.createdAt).format('DD/MM/YYYY')}
                  </td>
                  <td className="p-3 text-sm">
                    {payment.paymentValue.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td className="p-3 text-sm">
                    {dayjs(payment.paymentDate).format('DD/MM/YYYY')}
                  </td>
                  <td className="p-3 text-sm">
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
                  <td className="p-3 text-sm">
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
