'use client'

import { Logo } from '@/components/Header/Logo'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="flex h-full flex-col items-center justify-center text-zinc-50">
      <Logo />
      <p className="mt-3 text-xl">Olá {user?.name}</p>
    </div>
  )
}
