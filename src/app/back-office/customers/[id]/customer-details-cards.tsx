import { Card } from '@/components/ui/card'

interface CustomerDetailsCardsProps {
  user: {
    cpf: string
    email: string
    phone: string
    customerInfo: {
      isRenter: boolean
      lastAddress: {
        zip: string
        state: string
        city: string
        neighborhood: string
        street: string
        number: string
      }
    }
  }
}

export function CustomerDetailsCards({ user }: CustomerDetailsCardsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="space-y-2 border-none bg-zinc-800 p-4 text-zinc-50">
        <p className="text-lg font-bold">Dados do Cliente</p>
        <p>
          <strong>CPF: </strong> {user.cpf}
        </p>
        <p>
          <strong>Email: </strong> {user.email}
        </p>
        <p>
          <strong>Telefone: </strong> {user.phone}
        </p>
        <p>
          <strong>Se era alugado: </strong>{' '}
          {user.customerInfo.isRenter ? 'Sim' : 'Não'}
        </p>
      </Card>
      <Card className="space-y-2 border-none bg-zinc-800 p-4 text-zinc-50">
        <p className="text-lg font-bold">Dados do ultimo endereço</p>
        <p>
          <strong>CEP: </strong> {user.customerInfo.lastAddress.zip}
        </p>
        <p>
          <strong>Estado: </strong> {user.customerInfo.lastAddress.state}
        </p>
        <p>
          <strong>Cidade: </strong> {user.customerInfo.lastAddress.city}
        </p>
        <p>
          <strong>Bairro: </strong>
          {user.customerInfo.lastAddress.neighborhood}
        </p>
        <p>
          <strong>Rua: </strong> {user.customerInfo.lastAddress.street}
        </p>
        <p>
          <strong>N°: </strong> {user.customerInfo.lastAddress.number}
        </p>
      </Card>
    </div>
  )
}
