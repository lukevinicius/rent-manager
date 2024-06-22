import 'dayjs/locale/pt-br'

import { fetchPayments } from '@/actions/fetch-payments'
import { PaymentsList } from '@/components/payments-list'

export default async function Payments() {
  const payments = await fetchPayments()

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Lançamentos do Sistema</p>
      </div>
      <PaymentsList payments={payments} />
    </div>
  )
}
