import { api } from '@/services/api'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface DeletePropertyButtonProps {
  propertyId: string
}

export function DeletePropertyButton({
  propertyId,
}: DeletePropertyButtonProps) {
  const { toast } = useToast()

  async function handleDeleteProperty(id: string) {
    await api
      .delete(`/property/delete`, {
        data: {
          propertyId: id,
        },
      })
      .then(async () => {
        toast({
          title: 'Imóvel excluído com sucesso',
        })
      })
      .catch((error) => {
        toast({
          title: 'Erro ao excluir imóvel',
          description: error.response.data.message,
          variant: 'destructive',
        })
      })
  }

  return (
    <Button
      className="w-full bg-red-600 font-bold hover:bg-red-700"
      onClick={() => {
        handleDeleteProperty(propertyId)
      }}
    >
      Excluir
    </Button>
  )
}
