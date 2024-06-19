import { CustomerDetailsCards } from './customer-details-cards'
import { getCustomerById } from '@/actions/get-customer-by-id'
import { EditCustomerButton } from '@/app/back-office/customers/[id]/edit-customer-buttom'

export default async function UserById({ params }: { params: { id: string } }) {
  const { user, error } = await getCustomerById({
    userId: params.id,
  })

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        {user && <p className="text-2xl font-bold">Cliente: {user.name}</p>}
        {error && <p className="text-2xl font-bold">{error.message}</p>}
        <div className="max-lg:space-y-3 lg:flex lg:space-x-3">
          <EditCustomerButton userId={params.id} />
          {/* <Button
            size="sm"
            className="w-full bg-red-500 font-bold hover:bg-red-600"
            onClick={() => {
              router.push(`/customers/update/${user?.name}`)
            }}
          >
            Excluir
          </Button> */}
        </div>
      </div>
      {user && <CustomerDetailsCards user={user} />}
    </div>
  )
}
