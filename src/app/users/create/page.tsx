'use client'

import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { RiLoaderLine } from 'react-icons/ri'
import { z } from 'zod'

const createUserFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter no mínimo 3 caracteres'),
  email: z.string().email('O email deve ser válido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  passwordConfirmation: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type CreateUserFormProps = z.infer<typeof createUserFormSchema>

export default function CreateUser() {
  const toast = useToast()
  const router = useRouter()
  const createUserForm = useForm<CreateUserFormProps>({
    resolver: zodResolver(createUserFormSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createUserForm

  const handleCreateUser: SubmitHandler<CreateUserFormProps> = async (
    data: CreateUserFormProps,
  ) => {
    if (data.password !== data.passwordConfirmation) {
      toast({
        title: 'As senhas não coincidem',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })

      return
    }

    await api
      .post('/users/create-user', {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        role: 'ADMIN',
      })
      .then(() => {
        toast({
          title: 'Usuário criado com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        router.push('/users')
      })
      .catch((error) => {
        toast({
          title: 'Erro ao criar usuário',
          description: error.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
  }
  return (
    <div className="m-3 space-y-3 rounded-xl bg-zinc-800 p-3 text-zinc-50 laptop:m-5 laptop:space-y-5 laptop:p-5">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Criar usuário</p>
      </div>
      <FormProvider {...createUserForm}>
        <form
          onSubmit={handleSubmit(handleCreateUser)}
          className="rounded-xl bg-zinc-700 p-3"
        >
          <div className="grid-cols-2 gap-3 laptop:grid">
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
            <Form.Field>
              <Form.Label htmlFor="password">Senha</Form.Label>
              <Form.Input
                placeholder="Sua senha"
                type="password"
                name="password"
              />
              <Form.ErrorMessage field="password" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="passwordConfirmation">
                Confirmação de senha
              </Form.Label>
              <Form.Input
                placeholder="Confirme sua senha"
                type="password"
                name="passwordConfirmation"
              />
              <Form.ErrorMessage field="passwordConfirmation" />
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
              className="mt-3 bg-green-500 font-bold text-zinc-50 hover:bg-green-600"
              type="submit"
            >
              {isSubmitting ? (
                <RiLoaderLine className="h-6 w-6 animate-spin" />
              ) : (
                'Criar usuário'
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
