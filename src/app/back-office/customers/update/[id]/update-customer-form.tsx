'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

interface UpdateCustomerFormProps {
  customer: {
    name: string
    cpf: string
    phone: string
    email: string
    zip: string
    state: string
    city: string
    neighborhood: string
    street: string
    number: string
  }
}

const formSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  cpf: z.string(),
  phone: z.string(),
  email: z.string().email('O email deve ser válido'),
  zip: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  number: z.string(),
})

type FormProps = z.infer<typeof formSchema>

export function UpdateCustomerForm({ customer }: UpdateCustomerFormProps) {
  const toast = useToast()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: customer.cpf,
    },
  })

  async function onSubmit(values: FormProps) {
    startTransition(() => {
      /* await api
        .put('/users/update-customer', {
          userId: pathname.split('/').pop(),
          name: data.name,
          email: data.email,
          role: 'CUSTOMER',
          cpf: data.cpf,
          phone: data.phone,
          address: {
            zip: data.zip,
            state: data.state,
            city: data.city,
            neighborhood: data.neighborhood,
            street: data.street,
            number: data.number,
          },
        })
        .then(() => {
          toast({
            title: 'Cliente editado com sucesso',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })

          router.push('/customers')
        })
        .catch((error) => {
          toast({
            title: 'Erro ao editar Cliente',
            description: error.response.data.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }) */
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl bg-zinc-800 p-4"
      >
        <p className="my-3 font-bold">Dados pessoais</p>
        <div className="grid-cols-2 gap-3 max-lg:space-y-3 lg:grid">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Nome completo</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="cpf">CPF</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="cpf" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <p className="my-3 font-bold">Contato</p>
          <div className="grid-cols-2 gap-3 max-lg:space-y-3 lg:grid">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone">Telefone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="phone"
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <p className="my-3 font-bold">Ultimo endereço</p>
          <div className="grid-cols-2 gap-3 max-lg:space-y-3 lg:grid">
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="zip">CEP</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="zip" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="state">Estado</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="state"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="city">Cidade</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="city" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="neighborhood">Bairro</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="neighborhood"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="street">Rua</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="street"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="number">N°</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
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
              <Loader className="h-6 w-6 animate-spin" />
            ) : (
              'Atualizar cliente'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
