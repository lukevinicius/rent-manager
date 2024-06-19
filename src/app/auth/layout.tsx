import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auth | CJS Empreendimentos',
  description: 'Create an account or login to access the dashboard.',
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-900">
      {children}
    </div>
  )
}
