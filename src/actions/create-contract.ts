'use server'

import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { revalidatePath } from 'next/cache'

interface IRequest {
  startDate: string
  endDate: string
  paymentDate: string
  rentValue: string
  rentDeposit: string
  readjustment: string
  propertyId: string
  userId: string
}

export async function createContract({
  startDate,
  endDate,
  paymentDate,
  rentValue,
  rentDeposit,
  readjustment,
  propertyId,
  userId,
}: IRequest) {
  // generate payment to be paid in the payment day
  const qtdMonths = dayjs(endDate).diff(startDate, 'month')

  const payments = []
  for (let i = 0; i <= qtdMonths; i++) {
    payments.push({
      paymentValue: Number(rentValue) * 100,
      paymentDate: dayjs(paymentDate).add(i, 'month').toDate(),
    })
  }

  await prisma.contract.create({
    data: {
      propertyId,
      userId,
      startDate: dayjs(startDate).toDate(),
      endDate: dayjs(endDate).toDate(),
      readjustment: Number(readjustment) * 100,
      rentValue: Number(rentValue) * 100,
      rentDeposit: Number(rentDeposit) * 100,
      Payment: {
        createMany: {
          data: payments,
        },
      },
    },
  })

  revalidatePath('/back-office/contracts')

  return { error: true }
}
