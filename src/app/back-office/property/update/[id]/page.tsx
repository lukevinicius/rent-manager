import { getPropertyById } from '@/actions/get-property-by-id'
import { PropertyUpdateForm } from './update-form'

interface UpdatePropertyProps {
  params: {
    id: string
  }
}

export default async function UpdateProperty({ params }: UpdatePropertyProps) {
  const { data } = await getPropertyById(params.id)

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Atualização do Imóvel</p>
      </div>
      {data && <PropertyUpdateForm property={data} />}
    </div>
  )
}
