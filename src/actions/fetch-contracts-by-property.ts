'use server'

import { prisma } from '@/lib/prisma'

interface IResponse {
  data?: {
    id: string
    property: string
    customer: string
    status: boolean
    qtdPayments: string
  }[]
  error?: string
}

export async function fetchContractsByProperty(
  propertyId: string,
): Promise<IResponse> {
  const contracts = await prisma.contract.findMany({
    where: {
      propertyId,
    },
    select: {
      id: true,
      status: true,
      Property: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
      Payment: {
        select: {
          id: true,
          status: true,
        },
      },
    },
  })

  if (!contracts) {
    return { error: 'Contratos não encontrados' }
  }

  const data: IResponse = {
    data: contracts.map((contract) => ({
      id: contract.id,
      property: contract.Property.name,
      customer: contract.user.name,
      status: contract.status,
      qtdPayments: `${
        contract.Payment.filter((payment) => payment.status === true).length
      } / ${contract.Payment.length}`,
    })),
  }
  return data
}
