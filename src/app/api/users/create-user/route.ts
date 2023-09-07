import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.json()

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      username: data.username || '',
      role: data.role,
      cpf: data.cpf || '',
      phone: data.phone || '',
      customerInfo: {
        create: {
          isRenter: true,
          lastAddress: {
            create: {
              street: data.address.street || '',
              number: data.address.number || '',
              neighborhood: data.address.neighborhood || '',
              city: data.address.city || '',
              state: data.address.state || '',
              zip: data.address.zip || '',
            },
          },
        },
      },
    },
  })

  return NextResponse.json({ message: 'User created' }, { status: 201 })
}
