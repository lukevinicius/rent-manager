import { ReactElement } from 'react'
import { ActiveLink } from './ActiveLink'

type NavLinkProps = {
  href: string
  children: ReactElement
}

export function NavLink({ href, children }: NavLinkProps) {
  return <ActiveLink href={href}>{children}</ActiveLink>
}
