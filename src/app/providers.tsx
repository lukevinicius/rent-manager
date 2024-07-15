'use client'

import React from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { EdgeStoreProvider } from '@/lib/edgestore'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <EdgeStoreProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </EdgeStoreProvider>
    </CacheProvider>
  )
}
