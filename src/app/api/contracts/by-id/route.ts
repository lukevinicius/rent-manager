import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface IResponse {
  id: string
  property: {
    id: string
    name: string
    address: {
      street: string
      number: string
      neighborhood: string
      city: string
      state: string
      zip: string
    }
  }
  customer: {
    name: string
    email: string
    phone: string
  }
  status: boolean
  qtdPayments: string
  payments: {
    id: string
    status: boolean
    paymentValue: number
    paymentDate: Date
    createdAt: Date
    updatedAt: Date
  }[]
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  const contract = await prisma.contract.findUnique({
    where: {
      id: data.contractId,
    },
    select: {
      id: true,
      Property: {
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
      Payment: {
        select: {
          id: true,
          status: true,
          paymentValue: true,
          paymentDate: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      status: true,
    },
  })

  if (!contract) {
    return NextResponse.next()
  }

  const response: IResponse = {
    id: contract.id,
    property: contract.Property,
    customer: {
      name: contract.user.name,
      email: contract.user.email,
      phone: contract.user.phone || '',
    },
    payments: contract.Payment.map((payment) => ({
      id: payment.id,
      status: payment.status,
      paymentValue: payment.paymentValue / 100,
      paymentDate: payment.paymentDate,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
      // sort by date asc
    })).sort((a, b) => {
      if (a.paymentDate > b.paymentDate) {
        return -1
      }
      if (a.paymentDate < b.paymentDate) {
        return 1
      }
      return 0
    }),
    status: contract.status,
    qtdPayments: `${
      contract.Payment.filter((payment) => payment.status === true).length
    } / ${contract.Payment.length}`,
  }

  return NextResponse.json(response)
}
