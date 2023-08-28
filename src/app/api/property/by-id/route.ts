import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const data = await request.json()

  const property = await prisma.property.findUnique({
    where: {
      id: data.id,
    },
    select: {
      name: true,
      status: true,
    },
  })

  if (!property) {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 })
  }

  return NextResponse.json({ property })
}
