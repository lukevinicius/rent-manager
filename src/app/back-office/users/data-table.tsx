import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteUserButton } from './delete-user-buttom'
import { EditButton } from '@/components/edit-buttom'

interface UserDataTableProps {
  users: {
    id: string
    name: string
    username: string
    email: string
    role: string
  }[]
}

export function UsersDataTable({ users }: UserDataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-zinc-800  hover:bg-zinc-800">
          <TableHead className="text-center text-zinc-50">Nome</TableHead>
          <TableHead className="text-center text-zinc-50">Username</TableHead>
          <TableHead className="text-center text-zinc-50">Email</TableHead>
          <TableHead className="text-center text-zinc-50">Tipo</TableHead>
          <TableHead className="text-center text-zinc-50">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="space-y-10">
        {users.map((user) => (
          <TableRow key={user.id} className="bg-zinc-800  hover:bg-zinc-800">
            <TableCell className="text-center">{user.name}</TableCell>
            <TableCell className="text-center">{user.username}</TableCell>
            <TableCell className="text-center">{user.email}</TableCell>
            <TableCell className="text-center">{user.role}</TableCell>
            <TableCell className="flex space-x-2">
              <EditButton href={`/back-office/users/update/${user.id}`} />
              <DeleteUserButton userId={user.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
