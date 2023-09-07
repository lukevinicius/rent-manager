import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  const data = await request.json()

  await prisma.user.delete({
    where: {
      id: data.userId,
    },
  })

  return NextResponse.json({ message: 'User Deleted' }, { status: 200 })
}
