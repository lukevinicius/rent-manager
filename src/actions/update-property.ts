'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'

interface IRequest {
  propertyId: string
  photo: string
  name: string
  zip: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
}

export async function updateProperty({
  propertyId,
  photo,
  name,
  zip,
  state,
  city,
  neighborhood,
  street,
  number,
}: IRequest) {
  const property = await prisma.property.update({
    where: {
      id: propertyId,
    },
    data: {
      name,
      photo: [photo],
      address: {
        update: {
          zip,
          state,
          city,
          neighborhood,
          street,
          number,
        },
      },
    },
  })

  if (!property) {
    return { error: 'Erro ao atualizar' }
  }

  revalidatePath('/back-office/property')

  redirect('/back-office/property')
}
