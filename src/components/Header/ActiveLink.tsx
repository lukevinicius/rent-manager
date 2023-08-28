'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
}

export function ActiveLink({ children, ...rest }: ActiveLinkProps) {
  const pathname = usePathname()
  const href = rest.href.toString()

  let isActive = false

  if (pathname === href) {
    isActive = true
  }

  const classNameActive = isActive
    ? 'font-bold text-white border-b-2 border-orange-600 inline-block'
    : 'text-gray-300 inline-block break-keep whitespace-normal'

  return (
    <Link {...rest} className={classNameActive}>
      {children}
    </Link>
  )
}
