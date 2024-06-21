import { getContractById } from '@/actions/get-contract-by-id'
import { DetailsButton } from '@/components/details-buttom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { RiArticleFill, RiContactsFill, RiHome2Fill } from 'react-icons/ri'

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
  }).then((response) => {
    return response
  })

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Contratos</p>
        {/* <div className="max-lg:space-y-3 lg:flex lg:space-x-3">
          <Button
            size="sm"
            className="w-full bg-yellow-500 font-bold hover:bg-yellow-500"
            onClick={() => {
              router.push(`/customers/update/${contract?.customer.name}`)
            }}
          >
            Editar
          </Button>
          <Button
            size="sm"
            className="w-full bg-red-500 font-bold hover:bg-red-600"
            onClick={() => {
              router.push(`/customers/update/${contract?.customer.name}`)
            }}
          >
            Excluir
          </Button>
        </div> */}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="space-y-2 border-none bg-zinc-800 p-4 text-zinc-50">
          <div className="flex items-center space-x-2">
            <RiArticleFill />
            <p className="text-lg font-bold">Dados do Contrato</p>
          </div>
          <p className="text-sm">
            <strong>Alugueis Pagos: </strong> {contract?.qtdPayments}
          </p>
          <p className="text-sm">
            <strong>Status: </strong>{' '}
            {contract?.status ? 'Finalizado' : 'Em andamento'}
          </p>
          <p className="text-sm">
            <strong>Valor do Calção: </strong>{' '}
            {contract?.rentDeposit.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <p className="text-sm">
            <strong>Valor do Aluguel: </strong>{' '}
            {contract?.rentValue.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <p className="text-sm">
            <strong>Reajuste: </strong> {contract?.readjustment} %
          </p>
          <p className="text-sm">
            <strong>Data de inicio do contrato: </strong>{' '}
            {dayjs(contract?.startDate).format('DD/MM/YYYY')}
          </p>
          <p className="text-sm">
            <strong>Data final do contrato: </strong>{' '}
            {dayjs(contract?.endDate).format('DD/MM/YYYY')}
          </p>
        </Card>
        <Card className="space-y-2 border-none bg-zinc-800 p-4 text-zinc-50">
          <div className="flex items-center space-x-2">
            <RiHome2Fill />
            <p className="text-lg font-bold">Dados do Imóvel</p>
          </div>
          <p className="text-sm">
            <strong>Nome: </strong> {contract?.property.name}
          </p>
          <p className="text-sm">
            <strong>CEP: </strong> {contract?.property.address.zip}
          </p>
          <p className="text-sm">
            <strong>Estado: </strong> {contract?.property.address.state}
          </p>
          <p className="text-sm">
            <strong>Cidade: </strong> {contract?.property.address.city}
          </p>
          <p className="text-sm">
            <strong>Bairro: </strong> {contract?.property.address.neighborhood}
          </p>
          <p className="text-sm">
            <strong>Rua: </strong> {contract?.property.address.street}
          </p>
          <p className="text-sm">
            <strong>Número: </strong> {contract?.property.address.number}
          </p>
          <div>
            <DetailsButton
              href={`/back-office/property/${contract?.property.id}`}
            />
          </div>
        </Card>
        <Card className="space-y-2 border-none bg-zinc-800 p-4 text-zinc-50">
          <div className="flex items-center space-x-2">
            <RiContactsFill />
            <p className="text-lg font-bold">Dados do Cliente</p>
          </div>

          <p className="text-sm">
            <strong>Nome: </strong> {contract?.customer.name}
          </p>
          <p className="text-sm">
            <strong>Email: </strong> {contract?.customer.email}
          </p>
          <p className="text-sm">
            <strong>Telefone: </strong> {contract?.customer.phone}
          </p>

          <div>
            <DetailsButton
              href={`/back-office/customers/${contract?.customer.id}`}
            />
          </div>
        </Card>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Pagamentos deste contrato</p>
      </div>

      <div className="space-y-3 overflow-x-auto">
        <table className="w-full rounded-xl bg-zinc-700">
          <thead className="border-b-[1px]">
            <tr className="text-center">
              <th className="p-3 text-sm">Criado em:</th>
              <th className="p-3 text-sm">Valor</th>
              <th className="p-3 text-sm">Dia do Pagamento</th>
              <th className="p-3 text-sm">Status</th>
              <th className="p-3 text-sm">Atualização</th>
              <th className="p-3 text-sm"></th>
            </tr>
          </thead>
          <tbody className="p-5">
            {contract?.payments ? (
              contract?.payments.map((payment) => (
                <tr key={payment.id} className="p-5 text-center">
                  <td className="p-3 text-sm">
                    {dayjs(payment.createdAt).format('DD/MM/YYYY')}
                  </td>
                  <td className="p-3 text-sm">
                    {payment.paymentValue.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td className="p-3 text-sm">
                    {dayjs(payment.paymentDate).format('DD/MM/YYYY')}
                  </td>
                  <td className="p-3 text-sm">
                    {payment.status ? (
                      <p className="rounded-full bg-green-500 p-1 text-zinc-50">
                        Pago
                      </p>
                    ) : dayjs().isAfter(payment.paymentDate) ? (
                      <p className="rounded-full bg-red-500 p-1 text-zinc-50">
                        Atrasado
                      </p>
                    ) : (
                      <p className="rounded-full bg-blue-500 p-1 text-zinc-50">
                        Em Aberto
                      </p>
                    )}
                  </td>
                  <td className="p-3 text-sm">
                    {dayjs(payment.updatedAt)
                      .locale('pt-br')
                      .format('DD/MM/YYYY HH:MM:ss')}
                  </td>
                  <td className="space-y-3 p-3">
                    <Button className="w-full bg-green-600 font-bold hover:bg-green-700">
                      Pagar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center">Carregando...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
