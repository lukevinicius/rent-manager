'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'

interface IRequest {
  image: string
  name: string
  zip: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
}

export async function createProperty(data: IRequest) {
  await prisma.property
    .create({
      data: {
        name: data.name,
        photo: [data.image],
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
    .catch((error) => {
      console.error(error)
    })

  revalidatePath('/back-office/property')

  redirect('/back-office/property')
}
