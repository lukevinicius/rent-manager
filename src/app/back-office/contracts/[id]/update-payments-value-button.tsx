'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'

import { updatePaymentsValue } from '@/actions/update-payment-value'

interface UpdatePaymentValueButtonProps {
  contractId: string
}

export function UpdatePaymentValueButton({
  contractId,
}: UpdatePaymentValueButtonProps) {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  async function handleUpdatePaymentsValue(data: FormData) {
    const paymentValue = Number(data.get('paymentValue')?.toString() || '0')

    const { error } = await updatePaymentsValue({
      contractId,
      value: paymentValue,
    })

    if (error) {
      toast({
        title: 'Erro ao alterar valores dos pagamentos',
        description: 'Ocorreu um erro ao alterar os valores dos pagamentos',
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Valores dos pagamentos alterados',
        description: 'Os valores dos pagamentos foram alterados com sucesso',
      })
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Button type="button" className="bg-sky-600 hover:bg-sky-700">
          Alterar valores dos pagamentos em aberto
        </Button>
      </DialogTrigger>
      <DialogContent className="border-zinc-900 bg-zinc-900 text-zinc-50">
        <DialogHeader>
          <DialogTitle>Alterar valores dos pagamentos</DialogTitle>
          <DialogDescription>
            Alteração de valores dos pagamentos em aberto
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-2" action={handleUpdatePaymentsValue}>
          <label htmlFor="paymentValue" className="block text-sm font-medium">
            Novo valor dos pagamentos
          </label>
          <input
            type="number"
            name="paymentValue"
            id="paymentValue"
            className="block w-full rounded-md border-zinc-900 bg-zinc-800 p-3 text-base text-zinc-50 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
            placeholder="0"
          />
          <DialogFooter className="sm:justify-start">
            <div className="flex w-full justify-end space-x-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Confirmar
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
