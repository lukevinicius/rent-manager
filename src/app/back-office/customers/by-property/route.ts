import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface IResponse {
  id: string
  cpf: string
  name: string
  email: string
  phone: string
  address: {
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    zip: string
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  const user = await prisma.user.findUnique({
    where: {
      id: data.id,
    },
    select: {
      id: true,
      cpf: true,
      name: true,
      email: true,
      phone: true,
      customerInfo: {
        include: {
          lastAddress: true,
        },
      },
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const response: IResponse = {
    id: user.id,
    cpf: user.cpf || '',
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    address: user.customerInfo.lastAddress,
  }

  return NextResponse.json(response)
}
