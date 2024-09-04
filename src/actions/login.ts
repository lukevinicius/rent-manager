'use server'

import { compare } from 'bcryptjs'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { LoginSchema, LoginSchemaType } from '@/schemas/login'
import { prisma } from '@/lib/prisma'

export async function login(values: LoginSchemaType) {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
    }
  }

  const { username, password } = validatedFields.data

  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        password: true,
      },
    })

    if (!user || !user.password) {
      return {
        error: 'Invalid credentials!',
      }
    }

    const doestPasswordMatches = await compare(password, user.password)

    if (!doestPasswordMatches) {
      return {
        error: 'Invalid credentials!',
      }
    }

    const token = await jwt.sign(
      {
        role: user.role,
      },
      'secret-to-cs-emprendimentos-2023',
      {
        subject: user.id,
        expiresIn: '1h',
      },
    )

    const userLogged = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    }

    // expires in 1 hour
    await cookies().set('session', JSON.stringify(userLogged), {
      expires: Date.now() + 1000 * 60 * 60,
    })
  } catch (error) {
    console.error(error)
    return {
      error: 'Something went wrong!',
    }
  }

  return {}
}
