import { api } from '@/lib/axios'
import CreateContractForm from './form'

async function getDataToContract() {
  const customers = await api
    .post('/users/fetch-users', {
      role: 'CUSTOMER',
    })
    .then((response) => {
      return response.data
    })

  const propertys = await api.post('/property/fetch').then((response) => {
    return response.data
  })

  return {
    customers,
    propertys,
  }
}

export default async function CreateContract() {
  const { propertys, customers } = await getDataToContract()

  return (
    <div className="m-3 space-y-3 rounded-xl bg-zinc-800 p-3 text-zinc-50 laptop:m-5 laptop:space-y-5 laptop:p-5">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Criar contrato</p>
      </div>
      {!customers || !propertys ? (
        <div className="flex items-center justify-center">
          <p>Carregando...</p>
        </div>
      ) : (
        <CreateContractForm customers={customers} propertys={propertys} />
      )}
    </div>
  )
}
