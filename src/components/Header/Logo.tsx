import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/images/logo.png'

export function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="Logo" width={128} height={128} />
    </Link>
  )
}
