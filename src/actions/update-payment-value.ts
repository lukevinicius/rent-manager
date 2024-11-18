'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'

interface IRequest {
  contractId: string
  value: number
}

export async function updatePaymentsValue({ contractId, value }: IRequest) {
  try {
    await prisma.payment.updateMany({
      where: {
        contractId,
        status: false,
      },
      data: {
        paymentValue: value * 100,
      },
    })

    revalidatePath('/back-office/payments')
    revalidatePath('/back-office/contracts/[id]')
  } catch (error) {
    return { error }
  }

  return {}
}
