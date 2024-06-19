'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function CreateUserButton() {
  const router = useRouter()

  return (
    <Button
      className="bg-emerald-600 font-bold hover:bg-emerald-700"
      onClick={() => {
        router.push('/users/create')
      }}
    >
      Criar usuário
    </Button>
  )
}
