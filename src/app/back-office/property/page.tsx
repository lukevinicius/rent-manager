import { TableCell, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { DetailsButton } from '@/components/details-buttom'
import { EditButton } from '@/components/edit-buttom'
import Link from 'next/link'
import { fetchProperties } from '@/actions/fetch-properties'
import { DataTable } from '@/components/table'

export default async function PropertyList() {
  const properties = await fetchProperties()

  const headCells = ['', 'Imóvel', 'Ações']

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Meus Imóveis</p>
        <Link href="/back-office/property/create">
          <Button className="bg-emerald-600 font-bold hover:bg-emerald-700">
            Criar imóvel
          </Button>
        </Link>
      </div>
      <DataTable headCells={headCells}>
        {properties.map((property) => (
          <TableRow key={property.id} className="items-center">
            <TableCell>
              <img src={property.photo[0]} alt="IMG" className="h-24 w-24" />
            </TableCell>
            <TableCell className="text-center">{property.name}</TableCell>
            <TableCell className="flex flex-1 space-x-2">
              <DetailsButton href={`/back-office/property/${property.id}`} />
              <EditButton
                href={`/back-office/property/update/${property.id}`}
              />
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </div>
  )
}
