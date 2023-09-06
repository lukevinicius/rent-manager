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
      username: data.username,
    },
  })

  return NextResponse.json({ message: 'User updated' }, { status: 200 })
}
