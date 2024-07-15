import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EditButton } from '@/components/edit-buttom'
import { DetailsButton } from '@/components/details-buttom'
/* import { DeleteUserButton } from './delete-customer-buttom' */

interface UserDataTableProps {
  customers: {
    id: string
    name: string
    cpf: string
    username: string
    email: string
    phone: string
    role: string
  }[]
}

const headCells = ['Nome', 'CPF', 'Email', 'Telefone', 'Ações']

export function CustomersDataTable({ customers }: UserDataTableProps) {
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
      <TableBody className="space-y-10">
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className="text-center">{customer.name}</TableCell>
            <TableCell className="text-center">{customer.cpf}</TableCell>
            <TableCell className="text-center">{customer.email}</TableCell>
            <TableCell className="text-center">{customer.phone}</TableCell>
            <TableCell className="flex space-x-2">
              <DetailsButton href={`/back-office/customers/${customer.id}`} />
              <EditButton
                href={`/back-office/customers/update/${customer.id}`}
              />
              {/* <DeleteUserButton userId={customer.id} /> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
