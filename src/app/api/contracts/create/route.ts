import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import dayjs from 'dayjs'

export async function POST(request: NextRequest) {
  const data = await request.json()

  // generate payment to be paid in the payment day
  const qtdMonths = dayjs(data.endDate).diff(data.startDate, 'month')

  const payments = []
  for (let i = 0; i <= qtdMonths; i++) {
    payments.push({
      paymentValue: Number(data.rentValue) * 100,
      paymentDate: dayjs(data.startDate).add(i, 'month').toDate(),
    })
  }

  await prisma.contract.create({
    data: {
      startDate: dayjs(data.startDate).toDate(),
      endDate: dayjs(data.endDate).toDate(),
      propertyId: data.propertyId,
      readjustment: Number(data.readjustment) * 100,
      rentValue: Number(data.rentValue) * 100,
      rentDeposit: Number(data.rentDeposit) * 100,
      userId: data.userId,
      Payment: {
        createMany: {
          data: payments,
        },
      },
    },
  })

  return NextResponse.json({ message: 'Contract created' }, { status: 200 })
}
