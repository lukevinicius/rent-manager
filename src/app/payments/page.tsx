'use client'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'

interface IPayments {
  id: string
  status: boolean
  paymentValue: string
  contractId: string
  paymentDate: Date
  createdAt: Date
  updatedAt: Date
  customer: {
    id: string
    name: string
    email: string
    phone: string
  }
}

export default function Payments() {
  const router = useRouter()
  const [payments, setPayments] = useState<IPayments[] | null>(null)

  async function handleUpdateStatusPayment(paymentId: string, status: boolean) {
    await api
      .put('/payments/update-status', {
        paymentId,
        status,
      })
      .then((response) => {
        setPayments(response.data.data)
      })
  }

  useEffect(() => {
    async function getPayments() {
      await api.post('/payments/fetch').then((response) => {
        setPayments(response.data)
      })
    }

    getPayments()
  }, [])

  return (
    <div className="m-3 space-y-3 rounded-xl bg-zinc-800 p-3 text-zinc-50 laptop:m-5 laptop:space-y-5 laptop:p-5">
      <div className="flex justify-between">
        <p className="w-full text-xl font-bold">
          Lista de pagamentos do sistema
        </p>
        {/* <div>
          <select name="period" id="period">
            <option value="1">Hoje</option>

          </select>
          <Button className="w-full bg-blue-600 font-bold hover:bg-blue-700">
            Buscar
          </Button>
        </div> */}
      </div>
      <div className="space-y-5 overflow-x-auto">
        <table className="w-full rounded-xl bg-zinc-700">
          <thead className="border-b-[1px]">
            <tr className="text-center">
              <th className="p-3 text-sm">Cliente</th>
              <th className="p-3 text-sm">Valor</th>
              <th className="p-3 text-sm">Dia do Vencimento</th>
              <th className="p-3 text-sm">Status</th>
              <th className="p-3 text-sm">Atualizado em:</th>
            </tr>
          </thead>
          <tbody className="p-5">
            {payments ? (
              payments.map((payment) => (
                <tr key={payment.id} className="p-5 text-center">
                  <td className="p-3 text-sm">{payment.customer.name}</td>
                  <td className="p-3 text-sm">{payment.paymentValue}</td>
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
                    {!payment.status ? (
                      <Button
                        className="w-full bg-green-600 font-bold hover:bg-green-700"
                        onClick={() =>
                          handleUpdateStatusPayment(payment.id, payment.status)
                        }
                      >
                        Pagar
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-red-600 font-bold hover:bg-red-700"
                        onClick={() =>
                          handleUpdateStatusPayment(payment.id, payment.status)
                        }
                      >
                        Cancelar pagamento
                      </Button>
                    )}
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 font-bold hover:bg-blue-700"
                      onClick={() => {
                        router.push(`/contracts/${payment.contractId}`)
                      }}
                    >
                      Detalhes do contrato
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
