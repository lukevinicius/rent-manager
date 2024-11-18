'use client'

import { Header } from '@/components/auth/header'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
}

export function CardWrapper({ children }: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
