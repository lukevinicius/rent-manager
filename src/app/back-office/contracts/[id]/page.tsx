import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { RiArticleFill, RiContactsFill, RiHome2Fill } from 'react-icons/ri'

import { DetailsButton } from '@/components/details-buttom'
import { PaymentsList } from '@/components/payments-list'
import { Card } from '@/components/ui/card'

import { getContractById } from '@/actions/get-contract-by-id'

import { UpdatePaymentValueButton } from './update-payments-value-button'

interface ContractByIdProps {
  params: {
    id: string
  }
}

export default async function ContractById({ params }: ContractByIdProps) {
  const { contract } = await getContractById({
    body: {
      contractId: params.id,
    },
  })

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Contratos</p>
      </div>
      {contract && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="space-y-2 border-none bg-zinc-800 p-4 text-zinc-50">
            <div className="flex items-center space-x-2">
              <RiArticleFill />
              <p className="text-lg font-bold">Dados do Contrato</p>
            </div>
            <p className="text-sm">
              <strong>Alugueis Pagos: </strong> {contract.qtdPayments}
            </p>
            <p className="text-sm">
              <strong>Status: </strong>{' '}
              {contract.status ? 'Finalizado' : 'Em andamento'}
            </p>
            <p className="text-sm">
              <strong>Valor do Calção: </strong>{' '}
              {contract.rentDeposit.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
            <p className="text-sm">
              <strong>Valor do Aluguel: </strong>{' '}
              {contract.rentValue.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
            <p className="text-sm">
              <strong>Reajuste: </strong> {contract.readjustment} %
            </p>
            <p className="text-sm">
              <strong>Data de inicio do contrato: </strong>{' '}
              {dayjs(contract.startDate).format('DD/MM/YYYY')}
            </p>
            <p className="text-sm">
              <strong>Data final do contrato: </strong>{' '}
              {dayjs(contract.endDate).format('DD/MM/YYYY')}
            </p>
          </Card>
          <Card className="space-y-2 border-none bg-zinc-800 p-4 text-zinc-50">
            <div className="flex items-center space-x-2">
              <RiHome2Fill />
              <p className="text-lg font-bold">Dados do Imóvel</p>
            </div>
            <p className="text-sm">
              <strong>Nome: </strong> {contract.property.name}
            </p>
            <p className="text-sm">
              <strong>CEP: </strong> {contract.property.address.zip}
            </p>
            <p className="text-sm">
              <strong>Estado: </strong> {contract.property.address.state}
            </p>
            <p className="text-sm">
              <strong>Cidade: </strong> {contract.property.address.city}
            </p>
            <p className="text-sm">
              <strong>Bairro: </strong> {contract.property.address.neighborhood}
            </p>
            <p className="text-sm">
              <strong>Rua: </strong> {contract.property.address.street}
            </p>
            <p className="text-sm">
              <strong>Número: </strong> {contract.property.address.number}
            </p>
            <div>
              <DetailsButton
                href={`/back-office/property/${contract.property.id}`}
              />
            </div>
          </Card>
          <Card className="space-y-2 border-none bg-zinc-800 p-4 text-zinc-50">
            <div className="flex items-center space-x-2">
              <RiContactsFill />
              <p className="text-lg font-bold">Dados do Cliente</p>
            </div>

            <p className="text-sm">
              <strong>Nome: </strong> {contract.customer.name}
            </p>
            <p className="text-sm">
              <strong>Email: </strong> {contract.customer.email}
            </p>
            <p className="text-sm">
              <strong>Telefone: </strong> {contract.customer.phone}
            </p>

            <div>
              <DetailsButton
                href={`/back-office/customers/${contract.customer.id}`}
              />
            </div>
          </Card>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 rounded-xl bg-zinc-800 p-4 max-md:flex-col">
        <p className="text-2xl font-bold">Pagamentos deste contrato</p>
        <UpdatePaymentValueButton contractId={params.id} />
      </div>

      {contract && (
        <PaymentsList
          customerName={contract.customer.name}
          payments={contract.payments}
        />
      )}
    </div>
  )
}
