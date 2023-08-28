'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { usePathname, useRouter } from 'next/navigation'

interface IUser {
  id: string
  cpf: string
  name: string
  email: string
  phone: string
  address: {
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    zip: string
  }
}

export function PropertyContracts() {
  const pathname = usePathname()
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    async function getContracts() {
      const contracts = await api
        .post('/customers/by-property', {
          propertyId: pathname.split('/').pop(),
        })
        .then((response) => {
          setUser(response.data)
        })

      return contracts
    }

    getContracts()
  }, [pathname])

  return (
    <div className="space-y-3 rounded-xl bg-zinc-800 text-zinc-50 laptop:space-y-5">
      <div className="overflow-x-auto">
        <table className="w-full rounded-xl bg-zinc-700">
          <thead className="border-b-[1px]">
            <tr className="text-center">
              <th className="p-3">Imóvel</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Status</th>
              <th className="p-3">Alugueis pagos</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody className="p-5">
            {user ? (
              <>
                <p>Listagem de usuários</p>
              </>
            ) : (
              <tr>
                <td className="text-center">Carregando...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
