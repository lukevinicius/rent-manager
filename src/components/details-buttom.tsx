import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface EditButtomProps {
  href: string
}

export function DetailsButton({ href }: EditButtomProps) {
  return (
    <Link href={href} className="w-full">
      <Button
        size="sm"
        className="flex w-full space-x-2 bg-blue-600 font-bold hover:bg-blue-700"
      >
        <Search size={16} />
        <span>Detalhes</span>
      </Button>
    </Link>
  )
}
