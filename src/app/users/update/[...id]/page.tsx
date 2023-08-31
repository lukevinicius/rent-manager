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

const updateUserFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter no mínimo 3 caracteres'),
  email: z.string().email('O email deve ser válido'),
})

type UpdateUserFormProps = z.infer<typeof updateUserFormSchema>

export default function UpdateUser() {
  const toast = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const updateUserForm = useForm<UpdateUserFormProps>({
    resolver: zodResolver(updateUserFormSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = updateUserForm

  const handleUpdateUser: SubmitHandler<UpdateUserFormProps> = async (
    data: UpdateUserFormProps,
  ) => {
    await api
      .put('/users/update-user', {
        userId: pathname.split('/').pop(),
        name: data.name,
        username: data.username,
        email: data.email,
        role: 'ADMIN',
      })
      .then(() => {
        toast({
          title: 'Usuário editado com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        router.push('/users')
      })
      .catch((error) => {
        toast({
          title: 'Erro ao editar usuário',
          description: error.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
  }

  useEffect(() => {
    async function getUser() {
      const { data } = await api.post(`/users/by-id`, {
        userId: pathname.split('/').pop(),
      })

      updateUserForm.reset(data)
    }

    getUser()
  }, [pathname, updateUserForm])

  return (
    <div className="m-3 space-y-3 rounded-xl bg-zinc-800 p-3 text-zinc-50 laptop:m-5 laptop:space-y-5 laptop:p-5">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Edição de usuário</p>
      </div>
      <FormProvider {...updateUserForm}>
        <form
          onSubmit={handleSubmit(handleUpdateUser)}
          className="rounded-xl bg-zinc-700 p-3"
        >
          <div className="grid-cols-2 gap-3 max-laptop:space-y-3 laptop:grid">
            <Form.Field>
              <Form.Label htmlFor="name">Nome</Form.Label>
              <Form.Input placeholder="Nome" name="name" />
              <Form.ErrorMessage field="name" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="username">Usuário</Form.Label>
              <Form.Input placeholder="Usuário" name="username" />
              <Form.ErrorMessage field="username" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Input placeholder="Email" name="email" />
              <Form.ErrorMessage field="email" />
            </Form.Field>
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              className="mt-3 bg-red-500 font-bold text-zinc-50 hover:bg-red-600"
              type="button"
              onClick={() => router.push('/users')}
            >
              Cancelar
            </Button>
            <Button
              className="mt-3 bg-yellow-500 font-bold text-zinc-50 hover:bg-yellow-500"
              type="submit"
            >
              {isSubmitting ? (
                <RiLoaderLine className="h-6 w-6 animate-spin" />
              ) : (
                'Editar usuário'
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
