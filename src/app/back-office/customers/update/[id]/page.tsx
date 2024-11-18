import { getCustomerById } from '@/actions/get-customer-by-id'

import { UpdateCustomerForm } from './update-customer-form'

export default async function UpdateCustomer({
  params,
}: {
  params: { id: string }
}) {
  const { user } = await getCustomerById({
    userId: params.id,
  })

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Edição do cliente</p>
      </div>
      {user && (
        <UpdateCustomerForm
          customer={{
            id: user.id,
            cpf: user.cpf,
            name: user.name,
            email: user.email,
            phone: user.phone,
            neighborhood: user.customerInfo.lastAddress.neighborhood,
            street: user.customerInfo.lastAddress.street,
            number: user.customerInfo.lastAddress.number,
            city: user.customerInfo.lastAddress.city,
            state: user.customerInfo.lastAddress.state,
            zip: user.customerInfo.lastAddress.zip,
          }}
        />
      )}
    </div>
  )
}
