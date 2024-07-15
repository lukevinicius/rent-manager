import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface DataTableProps {
  headCells: string[]
  children: React.ReactNode
}

export function DataTable({ headCells, children }: DataTableProps) {
  return (
    <Table className="w-full bg-zinc-700">
      <TableHeader>
        <TableRow className="bg-zinc-800 hover:bg-zinc-800">
          {headCells.map((cell) => (
            <TableHead key={cell} className="text-center text-zinc-50">
              {cell}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  )
}
