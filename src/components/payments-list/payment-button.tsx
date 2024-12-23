'use client'

import { Button } from '@/components/ui/button'

import { updatePaymentStatus } from '@/actions/update-payment-status'

interface PaymentButtonProps {
  paymentId: string
  status: boolean
}

export function PaymentButton({ paymentId, status }: PaymentButtonProps) {
  function handleChangePaymentStatus() {
    updatePaymentStatus({ paymentId, status: !status })
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
