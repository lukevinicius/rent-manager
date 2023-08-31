'use client'

import { Header } from '@/components/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Sidebar } from '@/components/Sidebar'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="bg-[#3d3d3d]">
            {user?.id && <Header />}
            <div
              className={`mx-auto flex ${
                user?.id ? 'h-[calc(100vh-80px)]' : 'h-screen'
              } `}
            >
              {pathname.split('/')[1] !== 'sign-in' && <Sidebar />}
              <div className="w-full overflow-auto">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
