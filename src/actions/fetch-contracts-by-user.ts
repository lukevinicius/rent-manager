import { prisma } from '@/lib/prisma'

interface IResponse {
  id: string
  property: string
  customer: string
  status: boolean
  qtdPayments: string
}

export async function fetchContractsByUser(userId: string) {
  const contracts = await prisma.contract.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      Property: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
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

  const response: IResponse[] = contracts.map((contract) => {
    return {
      id: contract.id,
      property: contract.Property.name,
      customer: contract.user.name,
      status: contract.status,
      qtdPayments: `${
        contract.Payment.filter((payment) => payment.status === true).length
      } / ${contract.Payment.length}`,
    }
  })

  return response
}
