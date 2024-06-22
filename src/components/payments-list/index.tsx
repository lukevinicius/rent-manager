import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import dayjs from 'dayjs'
import { PaymentButton } from './payment-button'

interface PaymentsTableProps {
  customerName?: string
  payments: {
    id: string
    status: boolean
    customer?: {
      id: string
      name: string
      email: string
      phone: string
    }
    paymentValue: number
    paymentDate: Date
    updatedAt: Date
  }[]
}

export function PaymentsList({ customerName, payments }: PaymentsTableProps) {
  return (
    <Table className="w-full rounded-xl bg-zinc-700">
      <TableHeader>
        <TableRow className="rounded-xl bg-zinc-800 hover:bg-zinc-800">
          <TableHead className="text-center text-zinc-50">Cliente</TableHead>
          <TableHead className="text-center text-zinc-50">Valor</TableHead>
          <TableHead className="text-center text-zinc-50">
            Dia do Pagamento
          </TableHead>
          <TableHead className="text-center text-zinc-50">Status</TableHead>
          <TableHead className="text-center text-zinc-50">
            Atualizado em:
          </TableHead>
          <TableHead className="text-center text-zinc-50">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="p-5">
        {payments.map((payment) => (
          <TableRow key={payment.id} className="p-5 text-center">
            <TableCell className="p-3 text-sm">
              {customerName || payment.customer?.name}
            </TableCell>
            <TableCell className="p-3 text-sm">
              {payment.paymentValue.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </TableCell>
            <TableCell className="p-3 text-sm">
              {dayjs(payment.paymentDate).format('DD/MM/YYYY')}
            </TableCell>
            <TableCell className="p-3 text-sm">
              {payment.status ? (
                <p className="rounded-full bg-emerald-500 p-1 text-zinc-50">
                  Pago
                </p>
              ) : (
                <>
                  {dayjs().isAfter(payment.paymentDate) ? (
                    <p className="rounded-full bg-red-600 p-1 text-zinc-50">
                      Atrasado
                    </p>
                  ) : (
                    <p className="rounded-full bg-blue-600 p-1 text-zinc-50">
                      Em Aberto
                    </p>
                  )}
                </>
              )}
            </TableCell>
            <TableCell className="p-3 text-sm">
              {dayjs(payment.updatedAt)
                .locale('pt-br')
                .format('DD/MM/YYYY HH:MM:ss')}
            </TableCell>
            <TableCell className="space-y-3 p-3">
              <PaymentButton paymentId={payment.id} status={payment.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
