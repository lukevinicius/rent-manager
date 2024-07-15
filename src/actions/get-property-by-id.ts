'use server'

import { prisma } from '@/lib/prisma'

interface IResponse {
  id: string
  photo: string[]
  name: string
  status: boolean
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  zip: string
}

export async function getPropertyById(propertyId: string) {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    select: {
      photo: true,
      name: true,
      status: true,
      address: true,
    },
  })

  if (!property) {
    return { error: 'Imóvel não encontrado' }
  }

  const data: IResponse = {
    id: propertyId,
    photo: property.photo,
    name: property.name,
    status: property.status,
    street: property.address.street,
    number: property.address.number,
    neighborhood: property.address.neighborhood,
    city: property.address.city,
    state: property.address.state,
    zip: property.address.zip,
  }

  return { data }
}
