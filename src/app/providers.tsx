'use client'

import React from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '@/containers/AuthProvider'
import { SidebarDrawerProvider } from '@/containers/SidebarDrawerProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <AuthProvider>
          <SidebarDrawerProvider>{children}</SidebarDrawerProvider>
        </AuthProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
