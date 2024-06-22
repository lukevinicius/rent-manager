import { PropertyContracts } from './contracts'
import { getPropertyById } from '@/actions/get-property-by-id'
import { Card } from '@/components/ui/card'
import { EditButton } from '@/components/edit-buttom'

export default async function PropertyDetails({
  params,
}: {
  params: { id: string }
}) {
  /* async function handleDeleteProperty() {
    await api
      .delete(`/data/delete`, {
        data: {
          propertyId: params.id,
        },
      })
      .then(() => {
        router.push('/data')
      })
      .catch((error) => {
        toast({
          title: 'Erro ao excluir imóvel',
          description: error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })
      })
  } */

  const { data } = await getPropertyById(params.id)

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      {data && (
        <>
          <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
            <p className="text-2xl font-bold">Imóvel: {data.name}</p>
            <div className="flex space-x-2">
              <EditButton href={`/back-office/property/update/${params.id}`} />
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="space-y-2 border-none bg-zinc-800 p-4 text-zinc-50">
              <p className="text-lg font-bold">Informações do imóvel:</p>
              <p>Imóvel: {data.name}</p>
              <p>Status: {data.status ? 'Alugado' : 'Não alugado'}</p>
            </Card>
            <Card className="space-y-2 border-none bg-zinc-800 p-4 text-zinc-50">
              <p className="text-lg font-bold">Endereço:</p>
              <p>CEP: {data.zip}</p>
              <p>Esdado: {data.state}</p>
              <p>Cidade: {data.city}</p>
              <p>Bairro: {data.neighborhood}</p>
              <p>Rua: {data.street}</p>
              <p>Número: {data.number}</p>
            </Card>
          </div>
        </>
      )}
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Contratos deste imóvel</p>
      </div>
      <PropertyContracts propertyId={params.id} />
    </div>
  )
}
