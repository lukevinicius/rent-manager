/* import { useToast } from '@/components/ui/use-toast'
import { api } from '@/services/api'

export function DeleteContractButton() {
  const toast = useToast()
  async function handleDeleteContract(contractId: string) {
    await api
      .delete('/contracts/delete', {
        data: {
          contractId,
        },
      })
      .then(() => {
        toast({
          title: 'Contrato excluído com sucesso',
        })

        router.refresh()
      })
      .catch((error) => {
        toast({
          title: 'Erro ao excluir contrato',
          description: error.response.data.message,
        })
      })
  }
  return (
    <Dia>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          className="w-full bg-red-600 font-bold hover:bg-red-700"
        >
          Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-zinc-900 text-zinc-50">
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-50">
            Esta ação ira apagar esse contrato e todos os pagamentos referentes
            a ele.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-800">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={() => {
              handleDeleteContract(contract.id)
            }}
          >
            Sim
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </Dia>
  )
}
 */
