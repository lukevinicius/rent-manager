import { useState } from 'react'
import { Avatar, Button, useBreakpointValue } from '@chakra-ui/react'
import { useAuth } from '@/hooks/useAuth'
import { DrawerProfile } from './DrawerProfile'

export function Profile() {
  const { user } = useAuth()
  const [openModal, setOpenModal] = useState(false)

  const isWideVersion = useBreakpointValue<boolean>({
    base: false,
    lg: true,
  })

  return (
    <div className="items-end">
      {isWideVersion ? (
        <div className="flex items-center">
          <p>{user.username}</p>
          <Button
            _focus={{ outline: 'none' }}
            variant="link"
            onClick={() => setOpenModal(true)}
          >
            <Avatar size="sm" name={user.name} />
          </Button>
        </div>
      ) : (
        <div className="mr-2 text-center">
          <Button
            _focus={{ outline: 'none' }}
            variant="link"
            onClick={() => setOpenModal(true)}
          >
            <Avatar size="xs" name={user.name} />
          </Button>
        </div>
      )}

      <DrawerProfile
        username={user.username}
        isOpen={openModal}
        type={user.role}
        onClose={() => setOpenModal(false)}
      />
    </div>
  )
}
