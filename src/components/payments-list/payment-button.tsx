'use client'

import { changePaymentStatus } from '@/actions/change-payment-status'
import { Button } from '@/components/ui/button'

interface PaymentButtonProps {
  paymentId: string
  status: boolean
}

export function PaymentButton({ paymentId, status }: PaymentButtonProps) {
  function handleChangePaymentStatus() {
    changePaymentStatus({ paymentId, status: !status })
  }

  return (
    <Button
      className={`w-full  ${status ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}  font-bold `}
      onClick={handleChangePaymentStatus}
    >
      {status ? 'Marcar como não pago' : 'Marcar como pago'}
    </Button>
  )
}
