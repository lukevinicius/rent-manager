'use client'

import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { RiLoaderLine } from 'react-icons/ri'
import { z } from 'zod'

const createContractFormSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  rentValue: z.string(),
  rentDeposit: z.string(),
  readjustment: z.string(),
  propertyId: z.string(),
  userId: z.string(),
})

interface IPropertys {
  id: string
  name: string
}

interface ICustomers {
  id: string
  name: string
}

type CreateContractFormProps = z.infer<typeof createContractFormSchema>

export default function CreateContract() {
  const [customers, setCustomers] = useState<ICustomers[] | undefined>([])
  const [propertys, setPropertys] = useState<IPropertys[] | undefined>([])
  const toast = useToast()
  const router = useRouter()
  const createContractForm = useForm<CreateContractFormProps>({
    resolver: zodResolver(createContractFormSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createContractForm

  const handleCreateContract: SubmitHandler<CreateContractFormProps> = async (
    data: CreateContractFormProps,
  ) => {
    await api
      .post('/contracts/create', {
        startDate: data.startDate,
        endDate: data.endDate,
        rentValue: data.rentValue,
        rentDeposit: data.rentDeposit,
        readjustment: data.readjustment,
        propertyId: data.propertyId,
        userId: data.userId,
      })
      .then(() => {
        toast({
          title: 'Contrato criado com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        router.push('/contracts')
      })
      .catch((error) => {
        toast({
          title: 'Erro ao criar contrato',
          description: error.response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
  }

  useEffect(() => {
    async function getData() {
      await api
        .post('/users/fetch-users', {
          role: 'CUSTOMER',
        })
        .then((response) => {
          setCustomers(response.data)
        })

      await api.post('/property/fetch').then((response) => {
        setPropertys(response.data)
      })
    }

    getData()
  }, [])

  return (
    <div className="m-3 space-y-3 rounded-xl bg-zinc-800 p-3 text-zinc-50 laptop:m-5 laptop:space-y-5 laptop:p-5">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">Criar contrato</p>
      </div>
      <FormProvider {...createContractForm}>
        <form
          onSubmit={handleSubmit(handleCreateContract)}
          className="rounded-xl bg-zinc-700 p-3"
        >
          <div className="grid-cols-2 gap-3 max-laptop:space-y-3 laptop:grid">
            <Form.Field>
              <Form.Label htmlFor="startDate">
                Data de inicio do contrato
              </Form.Label>
              <Form.Input name="startDate" type="date" />
              <Form.ErrorMessage field="startDate" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="endDate">
                Data de final do contrato
              </Form.Label>
              <Form.Input name="endDate" type="date" />
              <Form.ErrorMessage field="endDate" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="rentDeposit">Valor do calção</Form.Label>
              <Form.Input name="rentDeposit" placeholder='Ex: "1000.00"' />
              <Form.ErrorMessage field="rentDeposit" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="rentValue">Valor do aluguel</Form.Label>
              <Form.Input name="rentValue" placeholder='Ex: "1000.00"' />
              <Form.ErrorMessage field="rentValue" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="readjustment">Valor do reajuste</Form.Label>
              <Form.Input name="readjustment" />
              <Form.ErrorMessage field="readjustment" />
            </Form.Field>
          </div>
          <div>
            <p className="my-3 font-bold">Cliente e imóvel do contrato</p>
            <div className="grid-cols-2 gap-3 max-laptop:space-y-3 laptop:grid">
              <Form.Field>
                <Form.Label htmlFor="propertyId">Imóvel</Form.Label>
                <Form.Select name="propertyId">
                  <option value="">Selecione a propriedade</option>
                  {propertys &&
                    propertys.map((property) => (
                      <option key={property.id} value={property.id}>
                        {property.name}
                      </option>
                    ))}
                </Form.Select>
                <Form.ErrorMessage field="propertyId" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="userId">Cliente</Form.Label>
                <Form.Select name="userId">
                  <option value="">Selecione o cliente</option>
                  {customers &&
                    customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                </Form.Select>
                <Form.ErrorMessage field="userId" />
              </Form.Field>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              className="mt-3 bg-red-500 font-bold text-zinc-50 hover:bg-red-600"
              type="button"
              onClick={() => router.push('/contracts')}
            >
              Cancelar
            </Button>
            <Button
              className="mt-3 bg-green-500 font-bold text-zinc-50 hover:bg-green-600"
              type="submit"
            >
              {isSubmitting ? (
                <RiLoaderLine className="h-6 w-6 animate-spin" />
              ) : (
                'Criar contrato'
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
