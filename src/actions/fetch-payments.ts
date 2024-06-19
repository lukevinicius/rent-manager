import { prisma } from '@/lib/prisma'

interface IResponse {
  id: string
  status: boolean
  paymentValue: string
  paymentDate: Date
  createdAt: Date
  updatedAt: Date
  contractId: string
  customer: {
    id: string
    name: string
    email: string
    phone: string
  }
}

export async function fetchPayments() {
  // const newPeriod = FormatPeriodToDate(data.period)

  const payments = await prisma.payment.findMany({
    include: {
      Contract: {
        select: {
          id: true,
          Property: true,
          user: true,
        },
      },
    },
    orderBy: {
      paymentDate: 'desc',
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
      contractId: payment.Contract.id,
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

  return response
}
