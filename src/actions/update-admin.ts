'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const bodySchema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string(),
  username: z.string(),
})

interface IRequest {
  body: z.infer<typeof bodySchema>
}

export async function updateAdmin({ body }: IRequest) {
  const validatedFields = bodySchema.safeParse(body)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
    }
  }

  await prisma.user.update({
    where: {
      id: body.userId,
    },
    data: {
      name: body.name,
      email: body.email,
      username: body.username,
    },
  })

  revalidatePath('/back-office/users')

  return {}
}
