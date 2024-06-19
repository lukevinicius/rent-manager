'use client'

import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function EditUserButton({ userId }: { userId: string }) {
  const router = useRouter()

  return (
    <Button
      size="sm"
      className="w-full bg-yellow-500 font-bold hover:bg-yellow-600"
      onClick={() => {
        router.push(`/back-office/users/update/${userId}`)
      }}
    >
      <Pencil size={16} />
    </Button>
  )
}
