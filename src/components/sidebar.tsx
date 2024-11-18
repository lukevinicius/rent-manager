import { HandCoins, Home, ScrollText, UserCog, UsersRound } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Logo } from './logo'
import { SidebarItem } from './sidebar-item'

type Props = {
  className?: string
}

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'left-0 top-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]',
        className,
      )}
    >
      <Link href="/back-office/contracts">
        <div className="flex items-center justify-center gap-x-3 py-7 pl-4">
          <Logo />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-y-2 overflow-auto scrollbar-none">
        <SidebarItem
          icon={<UserCog />}
          label="Usuários do Sistema"
          href="/back-office/users"
        />
        <SidebarItem
          icon={<Home />}
          label="Meus Imóveis"
          href="/back-office/property"
        />
        <SidebarItem
          icon={<UsersRound />}
          label="Meus Clientes"
          href="/back-office/customers"
        />
        <SidebarItem
          icon={<ScrollText />}
          label="Contratos"
          href="/back-office/contracts"
        />
        <SidebarItem
          icon={<HandCoins />}
          label="Pagamentos"
          href="/back-office/payments"
        />
      </div>
      {/* <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div> */}
    </div>
  )
}
