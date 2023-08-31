'use client'

import { Header } from '@/components/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Sidebar } from '@/components/Sidebar'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="bg-[#3d3d3d]">
            <Header />
            <div className="mx-auto flex h-[calc(100vh-80px)]">
              {pathname.split('/')[1] !== 'sign-in' && <Sidebar />}
              <div className="w-full overflow-auto">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
