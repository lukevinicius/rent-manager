'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { FormError } from '@/components/form-error'
import { updateAdmin } from '@/actions/update-admin'

const FormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter no mínimo 3 caracteres'),
  email: z.string().email('O email deve ser válido'),
})

type FormProps = z.infer<typeof FormSchema>

interface UpdateAdminFormProps {
  admin: {
    id: string
    name: string
    username: string
    email: string
  }
}

export function UpdateAdminForm({ admin }: UpdateAdminFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>(undefined)
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormProps>({
    resolver: zodResolver(FormSchema),
    defaultValues: admin,
  })

  async function onSubmit(data: FormProps) {
    startTransition(() => {
      updateAdmin({
        body: {
          userId: admin.id,
          ...data,
        },
      }).then((data) => {
        setError(data.error)

        if (!data.error) {
          router.back()
        }
      })
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl bg-zinc-800 p-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="name"
                  className="text-zinc-800"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Usuário</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="username"
                  className="text-zinc-800"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="email"
                  className="text-zinc-800"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormError message={error} />}
        <div className="flex justify-end space-x-3">
          <Button
            className="mt-3 font-bold text-zinc-50"
            type="button"
            variant="ghost"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button
            className="mt-3 bg-green-500 font-bold text-zinc-50 hover:bg-green-600"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              'Atualizar Admin'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
