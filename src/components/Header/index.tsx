import { useAuth } from '@/hooks/useAuth'
import { Profile } from './Profile'
import { Logo } from '@/components/logo'

export function Header() {
  const { user } = useAuth()

  return (
    <>
      <header className="z-50 flex h-16 w-full justify-center bg-blue-900 px-[calc((100vw-1450px)/2)] text-zinc-50 lg:h-20">
        <div className="mx-5 flex h-full w-full flex-wrap items-center justify-between">
          <div className="flex items-center space-x-5">
            <Logo />
          </div>

          {user.token && <Profile />}
        </div>
      </header>
    </>
  )
}
