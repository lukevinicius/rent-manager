import './globals.css'

import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'

import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Providers>
          <div className="min-h-screen bg-zinc-900">
            <div className="mx-auto flex">
              <div className="w-full overflow-auto">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
