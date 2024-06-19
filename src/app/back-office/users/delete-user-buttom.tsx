'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/services/api'
import { Trash } from 'lucide-react'

export function DeleteUserButton({ userId }: { userId: string }) {
  async function handleDeleteUser() {
    await api
      .delete('/users/delete-user', {
        data: {
          userId,
        },
      })
      .then(() => {
        toast({
          title: 'Usuário excluído com sucesso',
        })
      })
      .catch(() => {
        toast({
          title: 'Erro ao excluir usuário',
        })
      })
  }

  return (
    <Button
      size="sm"
      className="w-full bg-red-600 font-bold hover:bg-red-700"
      onClick={() => {
        handleDeleteUser()
      }}
    >
      <Trash size={16} />
    </Button>
  )
}
