import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.json()

  const property = await prisma.property.create({
    data: {
      name: data.name,
      address: {
        create: {
          zip: data.zip,
          state: data.state,
          city: data.city,
          neighborhood: data.neighborhood,
          street: data.street,
          number: data.number,
        },
      },
    },
  })

  if (!property) {
    return NextResponse.json({ error: 'Property not created' }, { status: 404 })
  }

  return NextResponse.json({ status: 201 })
}
