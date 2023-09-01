import {
  RiArticleLine,
  RiContactsLine,
  RiHandCoinLine,
  RiHome2Line,
  RiUserSettingsLine,
} from 'react-icons/ri'

import { NavLink } from './NavLink'
import { NavSection } from './NavSection'
import { useAuth } from '@/hooks/useAuth'

export function SidebarNav() {
  const { user } = useAuth()

  return (
    <div className="rounded-xl bg-zinc-900">
      {(user?.role === 'ADMIN' || user?.role === 'SUPORT') && (
        <NavSection title="Administração">
          <NavLink href="/users">
            <>
              <RiUserSettingsLine />
              <p className="ml-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
                Usuários do Sistema
              </p>
            </>
          </NavLink>
        </NavSection>
      )}
      <NavSection title="Alugueis">
        <NavLink href="/property">
          <>
            <RiHome2Line />
            <p className="ml-4">Meus Imóveis</p>
          </>
        </NavLink>
        <NavLink href="/customers">
          <>
            <RiContactsLine />
            <p className="ml-4">Meus Clientes</p>
          </>
        </NavLink>
        <NavLink href="/contracts">
          <>
            <RiArticleLine />
            <p className="ml-4">Meus Contratos</p>
          </>
        </NavLink>
        <NavLink href="/payments">
          <>
            <RiHandCoinLine />
            <p className="ml-4">Pagamentos</p>
          </>
        </NavLink>
      </NavSection>
    </div>
  )
}
