import { UserTypes } from '@/domain/enums/User'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { fetchUsersByRole } from '@/actions/fetch-users-by-role'

import { CustomersDataTable } from './data-table'

export default async function Customers() {
  const customers = await fetchUsersByRole({ role: UserTypes.CUSTOMER })

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Meus Clientes</p>
        <Link href="/back-office/customers/create">
          <Button className="bg-emerald-600 font-bold hover:bg-emerald-700">
            Criar cliente
          </Button>
        </Link>
      </div>
      <CustomersDataTable customers={customers} />
    </div>
  )
}
