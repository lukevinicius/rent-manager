'use client'

import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { RiEyeLine, RiEyeOffLine, RiLoaderLine } from 'react-icons/ri'
import { useAuth } from '@/hooks/useAuth'
import { Logo } from '@/components/Header/Logo'

const signInFormSchema = z.object({
  // required: true
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter no mínimo 3 caracteres'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type SignInFormProps = z.infer<typeof signInFormSchema>

export default function SignIn() {
  const { signIn } = useAuth()
  const [seePassword, setSeePassword] = useState(false)

  const signInForm = useForm<SignInFormProps>({
    resolver: zodResolver(signInFormSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = signInForm

  const handleSignIn: SubmitHandler<SignInFormProps> = async (
    data: SignInFormProps,
  ) => {
    await signIn({
      username: data.username,
      password: data.password,
    })
  }

  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center text-zinc-50">
      <div className="w-96 rounded-2xl bg-zinc-800 p-5 laptop:p-10">
        <div className="flex justify-center p-10">
          <Logo />
        </div>
        <FormProvider {...signInForm}>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-3">
              <Form.Field>
                <Form.Label htmlFor="username">Usuário</Form.Label>
                <Form.Input placeholder="Usuário" name="username" />
                <Form.ErrorMessage field="username" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="password">Senha</Form.Label>
                <div className="flex">
                  <div className="w-full">
                    <Form.Input
                      placeholder="Sua senha"
                      type={seePassword ? 'text' : 'password'}
                      name="password"
                    />
                  </div>
                  <Button
                    size="icon"
                    onClick={() => setSeePassword(!seePassword)}
                    type="button"
                    className="ml-2 w-1/6 bg-orange-500 text-zinc-50 hover:bg-orange-600"
                  >
                    {seePassword ? <RiEyeLine /> : <RiEyeOffLine />}
                  </Button>
                </div>
                <Form.ErrorMessage field="password" />
              </Form.Field>
              <Button
                className="w-full bg-green-500 font-bold text-zinc-50 hover:bg-green-600"
                type="submit"
              >
                {isSubmitting ? (
                  <RiLoaderLine className="h-6 w-6 animate-spin" />
                ) : (
                  'Entrar'
                )}
              </Button>
              {/* <Link
                className="flex justify-center text-zinc-50"
                onClick={onClose}
                href="/reset-password"
              >
                Esqueci a senha
              </Link> */}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
