import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface IResponse {
  id: string
  status: boolean
  paymentValue: string
  paymentDate: Date
  createdAt: Date
  updatedAt: Date
  customer: {
    id: string
    name: string
    email: string
    phone: string
  }
}

export async function PUT(request: NextRequest) {
  const data = await request.json()

  await prisma.payment.update({
    where: {
      id: data.paymentId,
    },
    data: {
      // update status to !status
      status: !data.status,
    },
  })

  const payments = await prisma.payment.findMany({
    where: {
      /*       paymentDate: {
        gte: newPeriod,
      }, */
    },
    include: {
      Contract: {
        include: {
          Property: true,
          user: true,
        },
      },
    },
  })

  const response: IResponse[] = payments.map((payment) => {
    return {
      id: payment.id,
      paymentDate: payment.paymentDate,
      paymentValue: (payment.paymentValue / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      property: {
        id: payment.Contract.Property.id,
        name: payment.Contract.Property.name,
      },
      customer: {
        id: payment.Contract.user.id,
        name: payment.Contract.user.name,
        email: payment.Contract.user.email,
        phone: payment.Contract.user.phone || '',
      },
      status: payment.status,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    }
  })

  return NextResponse.json({
    status: 200,
    data: response,
  })
}
