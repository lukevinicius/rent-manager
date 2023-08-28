import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface IResponse {
  id: string
  name: string
  username: string
  email: string
  role: string
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  console.log(data)

  const users = await prisma.user.findMany({
    where: {
      role: data.role,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
    },
  })

  if (!users) {
    return NextResponse.json({ error: 'Users not found' }, { status: 404 })
  }

  const usersResponse: IResponse[] = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      username: user.username || '',
      email: user.email,
      role: user.role,
    }
  })

  return NextResponse.json(usersResponse)
}
