import { useAuth } from '@/hooks/useAuth'
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react'

interface IBody {
  username: string
  type: string
  isOpen: boolean
  onClose: () => void
}

export function DrawerProfile({ isOpen, onClose }: IBody) {
  const { signOut } = useAuth()

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody className="bg-[#5a5a5a] px-0 py-5" color="whiteAlpha.900">
            <Divider color="gray.200" h="5px" />
            <p className="cursor-pointer p-5" onClick={() => signOut()}>
              Sair
            </p>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
