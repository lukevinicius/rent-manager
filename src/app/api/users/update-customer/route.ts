import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
  const data = await request.json()

  await prisma.user.update({
    where: {
      id: data.userId,
    },
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      cpf: data.cpf,
      phone: data.phone,
      customerInfo: {
        update: {
          lastAddress: {
            update: {
              zip: data.address.zip,
              state: data.address.state,
              city: data.address.city,
              neighborhood: data.address.neighborhood,
              street: data.address.street,
              number: data.address.number,
            },
          },
        },
      },
    },
  })

  return NextResponse.json({ message: 'User updated' }, { status: 200 })
}
