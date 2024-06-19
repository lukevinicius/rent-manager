import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/toaster'

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
          <div className="bg-zinc-900">
            <div className="mx-auto flex h-[calc(100vh-80px)] min-h-screen">
              <div className="w-full overflow-auto">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
