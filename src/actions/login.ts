'use server'

import { LoginSchema, LoginSchemaType } from '@/schemas'
import { api } from '@/services/api'
import { AxiosError } from 'axios'
import { cookies } from 'next/headers'

export async function login(values: LoginSchemaType) {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
    }
  }

  const { username, password } = validatedFields.data

  try {
    const { data } = await api.post('/auth/login', {
      username,
      password,
    })

    cookies().set('user', JSON.stringify(data))
  } catch (error) {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 401:
          return {
            error: 'Invalid credentials!',
          }
        default:
          console.error(error)
          return {
            error: 'Something went wrong!',
          }
      }
    }

    throw error
  }

  return {}
}
