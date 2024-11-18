import logo from '@/assets/images/logo.png'
import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="Logo" width={128} height={128} />
    </Link>
  )
}
