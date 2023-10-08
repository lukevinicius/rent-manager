import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  const data = await request.json()

  const property = await prisma.property.findUnique({
    where: {
      id: data.propertyId,
    },
    include: {
      contract: true,
    },
  })

  if (!property) {
    return NextResponse.json(
      { message: 'Propriedade não foi encontrada' },
      { status: 404 },
    )
  }

  console.log(property.contract)

  if (property.contract.map((contract) => contract.status).includes(false)) {
    return NextResponse.json(
      { message: 'Existe um contrato ativo para essa propriedade' },
      { status: 400 },
    )
  }

  await prisma.property.delete({
    where: {
      id: data.propertyId,
    },
  })

  return NextResponse.json({ status: 201 })
}
