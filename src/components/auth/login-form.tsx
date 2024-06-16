'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { login } from '@/actions/login'
import { LoginSchema, LoginSchemaType } from '@/schemas'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { useToast } from '@/components/ui/use-toast'

export function LoginForm() {
  const { replace } = useRouter()
  const { toast } = useToast()
  const [error, setError] = useState<string | undefined>(undefined)
  const [isPending, startTransition] = useTransition()
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function onSubmit(values: LoginSchemaType) {
    startTransition(() => {
      login(values).then((data) => {
        setError(data.error)

        if (!data.error) {
          toast({
            title: 'Bem vindo! 🎉',
            description: 'Você está logado com sucesso.',
            duration: 3000,
          })
          replace('/back-office')
        }
      })
    })
  }

  return (
    <CardWrapper headerLabel="Bem vindo de volta">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && <FormError message={error} />}
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
