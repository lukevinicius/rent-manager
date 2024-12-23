'use server'

import { z } from 'zod'

import { prisma } from '@/lib/prisma'

interface IResponse {
  id: string
  rentDeposit: number
  readjustment: number
  rentValue: number
  startDate: Date
  endDate: Date
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
    id: string
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
    updatedAt: Date
  }[]
}

const bodySquema = z.object({
  contractId: z.string(),
})

interface IRequest {
  body: z.infer<typeof bodySquema>
}

export async function getContractById({ body }: IRequest) {
  const contract = await prisma.contract.findUnique({
    where: {
      id: body.contractId,
    },
    select: {
      id: true,
      rentDeposit: true,
      readjustment: true,
      rentValue: true,
      startDate: true,
      endDate: true,
      Property: {
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
      user: {
        select: {
          id: true,
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
    return { error: 'Contract not found!' }
  }

  const response: IResponse = {
    id: contract.id,
    rentDeposit: contract.rentDeposit / 100,
    readjustment: contract.readjustment / 100,
    rentValue: contract.rentValue / 100,
    startDate: contract.startDate,
    endDate: contract.endDate,
    property: contract.Property,
    customer: {
      id: contract.user.id,
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

  return { contract: response }
}
