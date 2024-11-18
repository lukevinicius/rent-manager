'use client'

import { useState } from 'react'

import dayjs from 'dayjs'
import { CalendarCog } from 'lucide-react'

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

import { updatePaymentDate } from '@/actions/update-payment-date'

import { DatePicker } from '../date-picker'
import { useToast } from '../ui/use-toast'

interface UpdatePaymentDateButtonProps {
  paymentId: string
}

export function UpdatePaymentDateButton({
  paymentId,
}: UpdatePaymentDateButtonProps) {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()

  async function handleUpdatePaymentDate() {
    if (!selectedDate) {
      toast({
        title: 'Selecione uma data',
        description:
          'Por favor selecione uma data para alterar a data de vencimento',
        variant: 'destructive',
      })

      return
    } else if (dayjs(selectedDate).isBefore(dayjs().subtract(1, 'day'))) {
      toast({
        title: 'Data inválida',
        description: 'A data selecionada não pode ser anterior a data atual',
        variant: 'destructive',
      })

      return
    }

    const { error } = await updatePaymentDate({
      paymentId,
      newDate: selectedDate,
    })

    if (error) {
      toast({
        title: 'Erro ao alterar data de vencimento',
        description: 'Ocorreu um erro ao alterar a data de vencimento',
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Data de vencimento alterada',
        description: 'A data de vencimento foi alterada com sucesso',
      })

      // close dialog
      setIsDialogOpen(false)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Button type="button" className="bg-sky-600 hover:bg-sky-700">
          <CalendarCog size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="border-zinc-900 bg-zinc-900 text-zinc-50">
        <DialogHeader>
          <DialogTitle>Alterar data de vencimento</DialogTitle>
          <DialogDescription>
            Deseja alterar a data de vencimento deste pagamento?
          </DialogDescription>
        </DialogHeader>
        <div>
          <DatePicker setSelectedDate={setSelectedDate} />
        </div>
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
              onClick={handleUpdatePaymentDate}
            >
              Confirmar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
