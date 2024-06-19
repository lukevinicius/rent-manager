import { prisma } from '@/lib/prisma'

interface IRequest {
  role: string
}

interface IResponse {
  id: string
  name: string
  cpf: string
  username: string
  email: string
  phone: string
  role: string
}

export async function fetchUsersByRole({ role }: IRequest) {
  const users = await prisma.user.findMany({
    where: {
      role,
    },
    select: {
      id: true,
      name: true,
      cpf: true,
      username: true,
      email: true,
      phone: true,
      role: true,
    },
  })

  const usersResponse: IResponse[] = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      cpf: user.cpf || '',
      username: user.username || '',
      email: user.email,
      phone: user.phone || '',
      role: user.role,
    }
  })

  return usersResponse
}
