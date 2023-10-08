import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  const data = await request.json()

  // Exclude the contract and all its payments
  const payments = await prisma.payment.findMany({
    where: {
      contractId: data.contractId,
    },
  })

  console.log(payments)

  const paymentIds = payments.map((payment) => payment.id)

  const deletePayments = prisma.payment.deleteMany({
    where: {
      id: {
        in: paymentIds,
      },
    },
  })

  const deleteContract = prisma.contract.delete({
    where: {
      id: data.contractId,
    },
  })

  await prisma.$transaction([deletePayments, deleteContract])

  return NextResponse.json({
    status: 200,
    data: {
      message: 'Contrato excluído com sucesso!',
    },
  })
}
