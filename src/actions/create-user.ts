'use server'

import bcrypt from 'bcrypt'

import { prisma } from '@/lib/prisma'

interface Address {
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  zip: string
}

interface IRequest {
  name: string
  email: string
  username: string
  role: string
  password?: string
  cpf: string
  phone: string
  address: Address
}

export async function createUser({
  name,
  email,
  username,
  role,
  password,
  cpf,
  phone,
  address,
}: IRequest) {
  const passwordEncrypted = await bcrypt.hash(password || '', 10)

  await prisma.user.create({
    data: {
      name,
      email,
      username: username || '',
      role,
      cpf: cpf || '',
      phone: phone || '',
      password: passwordEncrypted,
      customerInfo: {
        create: {
          isRenter: true,
          lastAddress: {
            create: {
              street: address?.street || '',
              number: address?.number || '',
              neighborhood: address?.neighborhood || '',
              city: address?.city || '',
              state: address?.state || '',
              zip: address?.zip || '',
            },
          },
        },
      },
    },
  })
}
