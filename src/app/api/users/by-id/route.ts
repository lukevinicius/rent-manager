import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface IResponse {
  id: string
  name: string
  username: string
  cpf: string
  email: string
  phone: string
  zip: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  const user = await prisma.user.findUnique({
    where: {
      id: data.userId,
    },
    select: {
      id: true,
      name: true,
      username: true,
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
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const response: IResponse = {
    id: user.id,
    name: user.name,
    cpf: user.cpf || '',
    email: user.email,
    phone: user.phone || '',
    username: user.username || '',
    zip: user.customerInfo.lastAddress.zip || '',
    state: user.customerInfo.lastAddress.state || '',
    city: user.customerInfo.lastAddress.city || '',
    neighborhood: user.customerInfo.lastAddress.neighborhood || '',
    street: user.customerInfo.lastAddress.street || '',
    number: user.customerInfo.lastAddress.number || '',
  }

  return NextResponse.json(response)
}
