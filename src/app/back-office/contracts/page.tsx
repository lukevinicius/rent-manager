import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { fetchContracts } from '@/actions/fetch-contracts'
import Link from 'next/link'
import { DetailsButton } from '@/components/details-buttom'

export default async function Contracts() {
  const contracts = await fetchContracts()

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Contratos</p>
        <Link href="/back-office/contracts/create">
          <Button className="bg-emerald-600 font-bold hover:bg-emerald-700">
            Criar contrato
          </Button>
        </Link>
      </div>
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
          {contracts ? (
            contracts.map((contract) => (
              <TableRow
                key={contract.id}
                className="bg-zinc-700 p-5 text-center"
              >
                <TableCell className="p-3 text-sm">
                  {contract.property}
                </TableCell>
                <TableCell className="p-3 text-sm">
                  {contract.customer}
                </TableCell>
                <TableCell className="p-3 text-sm">
                  {contract.status ? 'Finalizado' : 'Em andamento'}
                </TableCell>
                <TableCell className="p-3 text-sm">
                  {contract.qtdPayments}
                </TableCell>
                <TableCell className="space-y-3 p-3">
                  <DetailsButton
                    href={`/back-office/contracts/${contract.id}`}
                  />
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
    </div>
  )
}
