import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  const data = await request.json()

  const user = await prisma.user.findFirst({
    where: {
      username: data.username,
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
    return NextResponse.json(
      { error: 'Username or password incorrect' },
      { status: 401 },
    )
  }

  const doestPasswordMatches = await compare(data.password, user.password)

  if (!doestPasswordMatches) {
    return NextResponse.json(
      { error: 'Username or password incorrect' },
      { status: 401 },
    )
  }

  // generate token
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

  return NextResponse.json({
    user: {
      ...user,
    },
    token,
  })
}
