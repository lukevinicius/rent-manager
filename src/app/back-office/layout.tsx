import { MobileHeader } from '@/components/mobile-header'
import { Sidebar } from '@/components/sidebar'

export default async function BackOfficeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="mx-4 h-full pt-[50px] lg:pl-[256px] lg:pt-0">
        <div className="mx-auto h-full max-w-[1056px] py-4 lg:py-6">
          {children}
        </div>
      </main>
    </>
  )
}
