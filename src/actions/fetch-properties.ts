import { prisma } from '@/lib/prisma'

export async function fetchProperties() {
  const properties = await prisma.property.findMany({
    select: {
      id: true,
      name: true,
      photo: true,
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

  return properties
}
