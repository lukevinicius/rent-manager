import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  const data = await request.json()

  // Exclude the contract
  const deleteContract = prisma.contract.delete({
    where: {
      id: data.userId,
    },
  })

  // Exclude all payments from this contract
  const deletePayments = prisma.payment.deleteMany({
    where: {
      contractId: data.userId,
    },
  })

  await prisma.$transaction([deleteContract, deletePayments])

  return NextResponse.json({ message: 'User Deleted' }, { status: 200 })
}
