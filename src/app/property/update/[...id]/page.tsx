'use client'

import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { RiLoaderLine } from 'react-icons/ri'
import { z } from 'zod'

const updatePropertyFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  zip: z.string().min(8, 'O CEP deve ter no mínimo 8 caracteres'),
  state: z.string().min(2, 'O estado deve ter no mínimo 2 caracteres'),
  city: z.string().min(3, 'A cidade deve ter no mínimo 3 caracteres'),
  neighborhood: z.string().min(3, 'O bairro deve ter no mínimo 3 caracteres'),
  street: z.string().min(3, 'A rua deve ter no mínimo 3 caracteres'),
  number: z.string().min(1, 'O número deve ter no mínimo 1 caractere'),
})

type UpdatePropertyFormProps = z.infer<typeof updatePropertyFormSchema>

export default function UpdateProperty() {
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const updatePropertyForm = useForm<UpdatePropertyFormProps>({
    resolver: zodResolver(updatePropertyFormSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = updatePropertyForm

  const handleUpdateProperty: SubmitHandler<UpdatePropertyFormProps> = async (
    data: UpdatePropertyFormProps,
  ) => {
    await api
      .put('/property/update', {
        propertyId: pathname.split('/').pop(),
        name: data.name,
        zip: data.zip,
        state: data.state,
        city: data.city,
        neighborhood: data.neighborhood,
        street: data.street,
        number: data.number,
      })
      .then(() => {
        toast({
          title: 'Imóvel editado com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        router.push('/property')
      })
      .catch((error) => {
        toast({
          title: 'Erro ao editar imóvel',
          description: error.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
  }

  useEffect(() => {
    async function getProperty() {
      await api
        .post(`/property/by-id`, {
          id: pathname.split('/').pop(),
        })
        .then((response) => {
          setLoading(false)
          updatePropertyForm.reset(response.data)
        })
    }

    getProperty()
  }, [pathname, updatePropertyForm])

  return (
    <div className="m-3 space-y-3 rounded-xl bg-zinc-800 p-3 text-zinc-50 laptop:m-5 laptop:space-y-5 laptop:p-5">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Atualização do Imóvel</p>
      </div>
      {!loading && (
        <FormProvider {...updatePropertyForm}>
          <form
            onSubmit={handleSubmit(handleUpdateProperty)}
            className="rounded-xl bg-zinc-700 p-3"
          >
            <div className="grid-cols-2 gap-3 max-laptop:space-y-3 laptop:grid">
              <Form.Field>
                <Form.Label htmlFor="name">Nome do imóvel</Form.Label>
                <Form.Input placeholder="Nome" name="name" />
                <Form.ErrorMessage field="name" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="zip">CEP</Form.Label>
                <Form.Input placeholder="Usuário" name="zip" />
                <Form.ErrorMessage field="zip" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="state">Estado</Form.Label>
                <Form.Input placeholder="state" name="state" />
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
                <Form.Label htmlFor="number">Número</Form.Label>
                <Form.Input name="number" />
                <Form.ErrorMessage field="number" />
              </Form.Field>
            </div>
            <div className="flex space-x-3 laptop:justify-end">
              <Button
                className="mt-3 bg-red-500 font-bold text-zinc-50 hover:bg-red-600 max-laptop:w-full"
                type="button"
                onClick={() => router.push('/property')}
              >
                Cancelar
              </Button>
              <Button
                className="mt-3 bg-green-500 font-bold text-zinc-50 hover:bg-green-600 max-laptop:w-full"
                type="submit"
              >
                {isSubmitting ? (
                  <RiLoaderLine className="h-6 w-6 animate-spin" />
                ) : (
                  'Atualizar Imóvel'
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  )
}
