import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import { fetchPayments } from '@/actions/fetch-payments'

export default async function Payments() {
  const payments = await fetchPayments()

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Lançamentos do Sistema</p>
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
                  {/* <td className="space-y-3 p-3">
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
                    <Link href={`/contracts/${payment.contractId}`}>
                      <Button
                        size="sm"
                        className="w-full bg-blue-600 font-bold hover:bg-blue-700"
                      >
                        Detalhes do contrato
                      </Button>
                    </Link>
                  </td> */}
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
