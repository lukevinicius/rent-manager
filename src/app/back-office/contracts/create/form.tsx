'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { RiLoaderLine } from 'react-icons/ri'
import { z } from 'zod'

import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

import { createContract } from '@/actions/create-contract'

const createContractFormSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  paymentDate: z.string(),
  rentValue: z.string(),
  rentDeposit: z.string(),
  readjustment: z.string(),
  propertyId: z.string(),
  userId: z.string(),
})

type IProperties = {
  id: string
  name: string
}

type ICustomers = {
  id: string
  name: string
}

type FormProps = z.infer<typeof createContractFormSchema>

interface CreateContractFormProps {
  customers: ICustomers[]
  properties: IProperties[]
}

export default function CreateContractForm({
  customers,
  properties,
}: CreateContractFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const createContractForm = useForm<FormProps>({
    resolver: zodResolver(createContractFormSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createContractForm

  const handleCreateContract: SubmitHandler<FormProps> = async (
    data: FormProps,
  ) => {
    const { error } = await createContract(data)

    if (error) {
      toast({
        title: 'Erro ao criar contrato',
        variant: 'destructive',
      })

      return
    }

    toast({
      title: 'Contrato criado com sucesso',
    })

    router.push('/back-office/contracts')
  }

  return (
    <FormProvider {...createContractForm}>
      <form
        onSubmit={handleSubmit(handleCreateContract)}
        className="space-y-6 rounded-xl bg-zinc-800 p-4"
      >
        <div className="space-y-4">
          <p className="font-bold">Condições do contrato</p>
          <div className="grid-cols-2 gap-3 max-lg:space-y-3 lg:grid">
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
              <Form.Label htmlFor="paymentDate">
                Data do vencimento de cada pagamento
              </Form.Label>
              <Form.Input name="paymentDate" type="date" />
              <Form.ErrorMessage field="paymentDate" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="rentDeposit">Valor do calção</Form.Label>
              <Form.Input name="rentDeposit" placeholder="Ex: 987.12" />
              <Form.ErrorMessage field="rentDeposit" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="rentValue">Valor do aluguel</Form.Label>
              <Form.Input name="rentValue" placeholder="Ex: 987.12" />
              <Form.ErrorMessage field="rentValue" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="readjustment">Valor do reajuste</Form.Label>
              <Form.Input name="readjustment" />
              <Form.ErrorMessage field="readjustment" />
            </Form.Field>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-bold">Cliente e imóvel do contrato</p>
          <div className="grid-cols-2 gap-3 max-lg:space-y-3 lg:grid">
            <Form.Field>
              <Form.Label htmlFor="propertyId">Imóvel</Form.Label>
              <Form.Select name="propertyId">
                <option value="">Selecione a propriedade</option>
                {properties &&
                  properties.map((property) => (
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
        <div className="mt-6 grid w-full grid-cols-2 content-center gap-2 text-center">
          <Button
            className="mt-3 w-full border-[1px] border-red-500 bg-transparent font-bold text-red-500 hover:bg-zinc-600"
            type="button"
            onClick={() => router.back()}
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
  )
}
