import { UserTypes } from '@/domain/enums/User'

import { fetchUsersByRole } from '@/actions/fetch-users-by-role'

import { CreateUserButton } from './create-user-buttom'
import { UsersDataTable } from './data-table'

export default async function Users() {
  const users = await fetchUsersByRole({ role: UserTypes.ADMIN })

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Usuários do Sistema</p>
        <CreateUserButton />
      </div>
      <div className="rounded-xl bg-zinc-800">
        <UsersDataTable users={users} />
      </div>
    </div>
  )
}
