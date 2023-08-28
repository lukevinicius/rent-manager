'use client'

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useBreakpointValue,
  DrawerBody,
} from '@chakra-ui/react'

import { SidebarNav } from './SidebarNav'
import { useSidebarDrawer } from '@/containers/SidebarDrawerProvider'

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer()

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent className="bg-zinc-800 p-3">
            <DrawerBody p="0">
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }

  return (
    <div className="min-w-[256px] max-w-[270px] overflow-auto border-r-[1px] border-zinc-50 bg-zinc-800 p-3">
      <SidebarNav />
    </div>
  )
}
