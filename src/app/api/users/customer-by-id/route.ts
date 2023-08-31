import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface IResponse {
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
  createdAt: string
  updatedAt: string
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
    customerInfo: {
      isRenter: user.customerInfo.isRenter,
      lastAddress: user.customerInfo.lastAddress,
    },
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }

  return NextResponse.json(response)
}
