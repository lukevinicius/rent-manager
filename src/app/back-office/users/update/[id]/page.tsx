import { getAdminById } from '@/actions/get-admin-by-id'

import { UpdateAdminForm } from './update-admin-form'

interface UpdateAdminProps {
  params: {
    id: string
  }
}

export default async function UpdateAdmin({ params }: UpdateAdminProps) {
  const { user } = await getAdminById({
    userId: params.id,
  })

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Edição do admin</p>
      </div>
      {user && <UpdateAdminForm admin={user} />}
    </div>
  )
}
