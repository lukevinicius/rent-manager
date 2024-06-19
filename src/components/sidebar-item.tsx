'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

type Props = {
  label: string
  icon: React.ReactNode
  href: string
}

export function SidebarItem({ label, icon, href }: Props) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Button
      variant={active ? 'sidebarOutline' : 'sidebar'}
      className="h-14 w-full justify-start text-white hover:text-zinc-600"
      asChild
    >
      <Link href={href}>
        {icon}
        <span className="pl-2">{label}</span>
      </Link>
    </Button>
  )
}
