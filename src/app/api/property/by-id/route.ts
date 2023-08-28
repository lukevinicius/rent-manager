import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface IResponse {
  name: string
  status: boolean
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  zip: string
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  const property = await prisma.property.findUnique({
    where: {
      id: data.id,
    },
    select: {
      name: true,
      status: true,
      address: true,
    },
  })

  if (!property) {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 })
  }

  const response: IResponse = {
    name: property.name,
    status: property.status,
    street: property.address.street,
    number: property.address.number,
    neighborhood: property.address.neighborhood,
    city: property.address.city,
    state: property.address.state,
    zip: property.address.zip,
  }

  return NextResponse.json(response)
}
