'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

const bodySchema = z.object({
  userId: z.string(),
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  cpf: z.string(),
  phone: z.string(),
  email: z.string().email('O email deve ser válido'),
  zip: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  number: z.string(),
})

interface IRequest {
  body: z.infer<typeof bodySchema>
}

export async function updateCustomer({ body }: IRequest) {
  const validatedFields = bodySchema.safeParse(body)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
    }
  }

  // Validations

  // If document is already in use
  const user = await prisma.user.findUnique({
    where: {
      cpf: body.cpf,
    },
  })

  if (user && user.id !== body.userId) {
    return {
      error: 'CPF já está em uso',
    }
  }

  await prisma.user.update({
    where: {
      id: body.userId,
    },
    data: {
      name: body.name,
      email: body.email,
      cpf: body.cpf,
      phone: body.phone,
      customerInfo: {
        update: {
          lastAddress: {
            update: {
              zip: body.zip,
              state: body.state,
              city: body.city,
              neighborhood: body.neighborhood,
              street: body.street,
              number: body.number,
            },
          },
        },
      },
    },
  })

  revalidatePath('/back-office/customers')

  return {}
}
