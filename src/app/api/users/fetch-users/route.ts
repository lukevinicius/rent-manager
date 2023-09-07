import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface IResponse {
  id: string
  name: string
  cpf: string
  username: string
  email: string
  phone: string
  role: string
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  const users = await prisma.user.findMany({
    where: {
      role: data.role,
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

  if (!users) {
    return NextResponse.json({ error: 'Users not found' }, { status: 404 })
  }

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

  return NextResponse.json(usersResponse)
}
