import CreateContractForm from './form'
import { fetchUsersByRole } from '@/actions/fetch-users'
import { fetchProperties } from '@/actions/fetch-properties'

async function getDataToContract() {
  const customers = await fetchUsersByRole({ role: 'CUSTOMER' })

  const properties = await fetchProperties()

  return {
    customers,
    properties,
  }
}

export default async function CreateContract() {
  const { properties, customers } = await getDataToContract()

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Criar Contrato</p>
      </div>
      {!customers || !properties ? (
        <div className="flex items-center justify-center">
          <p>Carregando...</p>
        </div>
      ) : (
        <CreateContractForm customers={customers} properties={properties} />
      )}
    </div>
  )
}
