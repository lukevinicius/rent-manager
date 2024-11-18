'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'

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
