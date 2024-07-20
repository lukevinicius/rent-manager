'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface IRequest {
  paymentId: string
  newDate: Date
}

export async function updatePaymentDate({ paymentId, newDate }: IRequest) {
  try {
    await prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        paymentDate: newDate,
      },
    })

    revalidatePath('/back-office')
  } catch (error) {
    console.log('Error updating payment date', error)
    return { error }
  }

  return {}
}
