'use client'

import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { RiLoaderLine } from 'react-icons/ri'
import { z } from 'zod'

const updateCustomerFormSchema = z.object({
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

type UpdateCustomerFormProps = z.infer<typeof updateCustomerFormSchema>

export default function UpdateCustomer() {
  const toast = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const updateCustomerForm = useForm<UpdateCustomerFormProps>({
    resolver: zodResolver(updateCustomerFormSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = updateCustomerForm

  const handleUpdateCustomer: SubmitHandler<UpdateCustomerFormProps> = async (
    data: UpdateCustomerFormProps,
  ) => {
    await api
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
      })
  }

  useEffect(() => {
    async function getCustomer() {
      const { data } = await api.post(`/users/by-id`, {
        userId: pathname.split('/').pop(),
      })

      updateCustomerForm.reset(data)
    }

    getCustomer()
  }, [pathname, updateCustomerForm])

  return (
    <div className="m-3 space-y-3 rounded-xl bg-zinc-800 p-3 text-zinc-50 laptop:m-5 laptop:space-y-5 laptop:p-5">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Edição de cliente</p>
      </div>
      <FormProvider {...updateCustomerForm}>
        <form
          onSubmit={handleSubmit(handleUpdateCustomer)}
          className="rounded-xl bg-zinc-700 p-3"
        >
          <div className="grid-cols-2 gap-3 max-laptop:space-y-3 laptop:grid">
            <Form.Field>
              <Form.Label htmlFor="name">Nome</Form.Label>
              <Form.Input name="name" />
              <Form.ErrorMessage field="name" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="cpf">CPF</Form.Label>
              <Form.Input name="cpf" />
              <Form.ErrorMessage field="cpf" />
            </Form.Field>
          </div>
          <div>
            <p className="my-3 font-bold">Contato</p>
            <div className="grid-cols-2 gap-3 max-laptop:space-y-3 laptop:grid">
              <Form.Field>
                <Form.Label htmlFor="phone">Telefone</Form.Label>
                <Form.Input name="phone" />
                <Form.ErrorMessage field="phone" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Input placeholder="Email" name="email" />
                <Form.ErrorMessage field="email" />
              </Form.Field>
            </div>
          </div>
          <div>
            <p className="my-3 font-bold">Ultimo endereço</p>
            <div className="grid-cols-2 gap-3 max-laptop:space-y-3 laptop:grid">
              <Form.Field>
                <Form.Label htmlFor="zip">CEP</Form.Label>
                <Form.Input name="zip" />
                <Form.ErrorMessage field="zip" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="state">Estado</Form.Label>
                <Form.Input name="state" />
                <Form.ErrorMessage field="state" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="city">Cidade</Form.Label>
                <Form.Input name="city" />
                <Form.ErrorMessage field="city" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="neighborhood">Bairro</Form.Label>
                <Form.Input name="neighborhood" />
                <Form.ErrorMessage field="neighborhood" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="street">Rua</Form.Label>
                <Form.Input name="street" />
                <Form.ErrorMessage field="street" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="number">N°</Form.Label>
                <Form.Input name="number" />
                <Form.ErrorMessage field="number" />
              </Form.Field>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              className="mt-3 bg-red-500 font-bold text-zinc-50 hover:bg-red-600"
              type="button"
              onClick={() => router.push('/customers')}
            >
              Cancelar
            </Button>
            <Button
              className="mt-3 bg-green-500 font-bold text-zinc-50 hover:bg-green-600"
              type="submit"
            >
              {isSubmitting ? (
                <RiLoaderLine className="h-6 w-6 animate-spin" />
              ) : (
                'Atualizar cliente'
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
