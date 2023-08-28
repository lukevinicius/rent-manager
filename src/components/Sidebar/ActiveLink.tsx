import { ReactElement } from 'react'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  shouldMatchExactHref?: boolean
}

export function ActiveLink({ children, ...rest }: ActiveLinkProps) {
  const pathname = usePathname()
  let isActive = false

  if (pathname === rest.href) {
    isActive = true
  }

  return (
    <Link
      {...rest}
      className={`mb-3 flex w-full items-center rounded-xl p-3 text-zinc-50 ${
        isActive
          ? 'bg-[#6d6d6d] font-bold text-zinc-50'
          : 'duration-300 hover:bg-[#3d3d3d]'
      }`}
    >
      {children}
    </Link>
  )
}
