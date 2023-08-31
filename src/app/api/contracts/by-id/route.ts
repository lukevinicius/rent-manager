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
    status: contract.status,
    qtdPayments: `${
      contract.Payment.filter((payment) => payment.status === true).length
    } / ${contract.Payment.length}`,
  }

  return NextResponse.json(response)
}
