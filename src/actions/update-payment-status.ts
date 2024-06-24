'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface IRequest {
  paymentId: string
  status: boolean
}

export async function updatePaymentStatus({ paymentId, status }: IRequest) {
  await prisma.payment.update({
    where: {
      id: paymentId,
    },
    data: {
      status,
    },
  })

  revalidatePath('/back-office/payments')
  revalidatePath('/back-office/contracts/[id]')
}
