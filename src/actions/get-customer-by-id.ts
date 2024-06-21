import { prisma } from '@/lib/prisma'

interface IRequest {
  userId: string
}

interface IResponse {
  user?: {
    id: string
    name: string
    cpf: string
    email: string
    phone: string
    customerInfo: {
      isRenter: boolean
      lastAddress: {
        zip: string
        state: string
        city: string
        neighborhood: string
        street: string
        number: string
      }
    }
  }
  error?: {
    message: string
  }
}

export async function getCustomerById({
  userId,
}: IRequest): Promise<IResponse> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      cpf: true,
      email: true,
      phone: true,
      customerInfo: {
        select: {
          isRenter: true,
          lastAddress: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })

  if (!user) {
    return {
      error: {
        message: 'Cliente não encontrado',
      },
    }
  }

  const response = {
    user: {
      id: user.id,
      name: user.name,
      cpf: user.cpf || '',
      email: user.email,
      phone: user.phone || '',
      customerInfo: {
        isRenter: user.customerInfo.isRenter,
        lastAddress: user.customerInfo.lastAddress,
      },
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    },
  }

  return response
}
