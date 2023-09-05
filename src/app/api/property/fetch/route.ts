import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST() {
  const propertys = await prisma.property.findMany({
    select: {
      id: true,
      name: true,
      address: {
        select: {
          zip: true,
          state: true,
          city: true,
          street: true,
          number: true,
        },
      },
    },
  })

  return NextResponse.json(propertys)
}
