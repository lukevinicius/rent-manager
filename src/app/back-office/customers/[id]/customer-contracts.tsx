import { DetailsButton } from '@/components/details-buttom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { fetchContractsByUser } from '@/actions/fetch-contracts-by-user'

const headCells = ['Nome', 'CPF', 'Email', 'Telefone', 'Ações']

interface CustomerContractsProps {
  userId: string
}

export async function CustomerContracts({ userId }: CustomerContractsProps) {
  const contracts = await fetchContractsByUser(userId)

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-zinc-800  hover:bg-zinc-800">
          {headCells.map((cell) => (
            <TableHead key={cell} className="text-center text-zinc-50">
              {cell}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {contracts ? (
          contracts.map((contract) => (
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
