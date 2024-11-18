import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

import { Logo } from '@/components/logo'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="flex h-full flex-col items-center justify-center text-zinc-50">
      <Logo />
      <p className="mt-3 text-xl">Olá {user?.name}</p>
      <Link href="/back-office/users" className="underline">
        Acessar o backoffice
      </Link>
    </div>
  )
}
