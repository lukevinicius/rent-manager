import { prisma } from '@/lib/prisma'

interface IResponse {
  id: string
  property: string
  customer: string
  status: boolean
  qtdPayments: string
}

export async function fetchContracts() {
  const contracts = await prisma.contract.findMany({
    select: {
      id: true,
      Property: {
        select: {
          name: true,
        },
      },
      userId: true,
      Payment: {
        select: {
          id: true,
          status: true,
        },
      },
      status: true,
    },
  })

  const user = await prisma.user.findMany({
    where: {
      id: {
        in: contracts.map((contract) => contract.userId),
      },
    },
  })

  const response: IResponse[] = contracts.map((contract) => {
    return {
      id: contract.id,
      property: contract.Property.name,
      customer: user.find((user) => user.id === contract.userId)?.name || '',
      status: contract.status,
      qtdPayments: `${
        contract.Payment.filter((payment) => payment.status === true).length
      } / ${contract.Payment.length}`,
    }
  })

  return response
}
