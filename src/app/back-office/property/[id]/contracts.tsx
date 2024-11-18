import { DetailsButton } from '@/components/details-buttom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { fetchContractsByProperty } from '@/actions/fetch-contracts-by-property'

interface contractsProps {
  propertyId: string
}

export async function PropertyContracts({ propertyId }: contractsProps) {
  /* async function handleDeleteUser(contractId: string) {
    await api
      .delete('/contracts/delete', {
        data: {
          contractId,
        },
      })
      .then(() => {
        toast({
          title: 'Contrato excluído com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })

        router.refresh()
      })
      .catch((error) => {
        toast({
          title: 'Erro ao excluir contrato',
          description: error.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
  } */

  const { data } = await fetchContractsByProperty(propertyId)

  return (
    <Table className="space-y-4">
      <TableHeader>
        <TableRow className="rounded-xl bg-zinc-800 hover:bg-zinc-800">
          <TableHead className="text-center text-zinc-50">Imóvel</TableHead>
          <TableHead className="text-center text-zinc-50">Cliente</TableHead>
          <TableHead className="text-center text-zinc-50">Status</TableHead>
          <TableHead className="text-center text-zinc-50">
            Alugueis Pagos
          </TableHead>
          <TableHead className="text-center text-zinc-50">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data ? (
          data.map((contract) => (
            <TableRow key={contract.id} className="bg-zinc-700 p-5 text-center">
              <TableCell className="p-3 text-sm">{contract.property}</TableCell>
              <TableCell className="p-3 text-sm">{contract.customer}</TableCell>
              <TableCell className="p-3 text-sm">
                {contract.status ? 'Finalizado' : 'Em andamento'}
              </TableCell>
              <TableCell className="p-3 text-sm">
                {contract.qtdPayments}
              </TableCell>
              <TableCell className="space-y-3 p-3">
                <DetailsButton href={`/back-office/contracts/${contract.id}`} />
                {/* <Button
                      size="sm"
                      className="w-full bg-yellow-500 font-bold hover:bg-yellow-600"
                      onClick={() => {
                        router.push(`/back-office/contracts/update/${contract.id}`)
                      }}
                    >
                      Editar
                    </Button> */}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <tr>
            <TableCell className="text-center">Carregando...</TableCell>
          </tr>
        )}
      </TableBody>
    </Table>
  )
}
