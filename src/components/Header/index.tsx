'use client'

import { useAuth } from '@/hooks/useAuth'
import { Logo } from './Logo'
import { Profile } from './Profile'
import { useSidebarDrawer } from '@/containers/SidebarDrawerProvider'
import { RiMenu2Line } from 'react-icons/ri'
import { useBreakpointValue } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const { onOpen } = useSidebarDrawer()
  const { user } = useAuth()

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <>
      <header className="z-50 flex h-16 w-full justify-center bg-blue-900 px-[calc((100vw-1450px)/2)] text-zinc-50 laptop:h-20">
        <div className="mx-5 flex h-full w-full flex-wrap items-center justify-between">
          <div className="flex items-center space-x-5">
            {isMobile && pathname.split('/')[1] !== 'sign-in' && (
              <RiMenu2Line
                onClick={onOpen}
                size={30}
                className="cursor-pointer"
              />
            )}
            <Logo />
          </div>

          {user?.token && <Profile />}
        </div>
      </header>
    </>
  )
}
