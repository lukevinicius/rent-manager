'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function createUser() {
  const data = {
    name: 'Admin',
    email: 'admin@mail.com',
    username: 'admin',
    role: 'ADMIN',
    password: 'admin',
    cpf: '00000000000',
    phone: '00000000000',
    address: {
      street: 'Rua do Admin',
      number: '123',
      neighborhood: 'Bairro do Admin',
      city: 'Cidade do Admin',
      state: 'Estado do Admin',
      zip: '00000-000',
    },
  }

  const passwordEncrypted = await bcrypt.hash(data.password, 10)

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      username: data.username || '',
      role: data.role,
      cpf: data.cpf || '',
      phone: data.phone || '',
      password: passwordEncrypted,
      customerInfo: {
        create: {
          isRenter: true,
          lastAddress: {
            create: {
              street: data.address?.street || '',
              number: data.address?.number || '',
              neighborhood: data.address?.neighborhood || '',
              city: data.address?.city || '',
              state: data.address?.state || '',
              zip: data.address?.zip || '',
            },
          },
        },
      },
    },
  })
}
