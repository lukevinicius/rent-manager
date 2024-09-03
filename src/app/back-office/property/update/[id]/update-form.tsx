'use client'

import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useEdgeStore } from '@/lib/edgestore'

import { Form } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { updateProperty } from '@/actions/update-property'
import { useToast } from '@/components/ui/use-toast'
import { SingleImageDropzone } from '@/components/single-image-dropzone'

const formSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  zip: z.string().min(8, 'O CEP deve ter no mínimo 8 caracteres'),
  state: z.string().min(2, 'O estado deve ter no mínimo 2 caracteres'),
  city: z.string().min(3, 'A cidade deve ter no mínimo 3 caracteres'),
  neighborhood: z.string().min(3, 'O bairro deve ter no mínimo 3 caracteres'),
  street: z.string().min(3, 'A rua deve ter no mínimo 3 caracteres'),
  number: z.string().min(1, 'O número deve ter no mínimo 1 caractere'),
})

type FormProps = z.infer<typeof formSchema>

interface UpdatePropertyFormProps {
  property: {
    id: string
    photo: string[]
    name: string
    zip: string
    state: string
    city: string
    neighborhood: string
    street: string
    number: string
  }
}

export function PropertyUpdateForm({ property }: UpdatePropertyFormProps) {
  const router = useRouter()
  const { edgestore } = useEdgeStore()
  const [file, setFile] = useState<File>()
  const { toast } = useToast()
  const updatePropertyForm = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: property,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = updatePropertyForm

  const handleUpdateProperty: SubmitHandler<FormProps> = async (
    data: FormProps,
  ) => {
    if (property.photo[0] && file) {
      await edgestore.publicFiles.delete({
        url: property.photo[0],
      })
    }

    let res
    if (file) {
      res = await edgestore.publicFiles.upload({
        file: file as File,
      })
    }

    const { error } = await updateProperty({
      propertyId: property.id,
      photo: res?.url || property.photo[0],
      name: data.name,
      zip: data.zip,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      number: data.number,
    })

    if (error) {
      toast({
        title: 'Erro ao atualizar imóvel',
        variant: 'destructive',
      })
    }

    router.push('/back-office/property')
  }

  return (
    <FormProvider {...updatePropertyForm}>
      <form
        onSubmit={handleSubmit(handleUpdateProperty)}
        className="space-y-6 rounded-xl bg-zinc-800 p-4"
      >
        <div className="flex justify-between">
          {!file && (
            <img
              src={property.photo[0]}
              alt="Imagem do imóvel"
              className="h-24 w-24"
            />
          )}
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            onChange={(file) => {
              setFile(file as File)
            }}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Form.Field>
            <Form.Label htmlFor="name">Nome do imóvel</Form.Label>
            <Form.Input name="name" />
            <Form.ErrorMessage field="name" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="zip">CEP</Form.Label>
            <Form.Input name="zip" />
            <Form.ErrorMessage field="zip" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="state">Estado</Form.Label>
            <Form.Input name="state" />
            <Form.ErrorMessage field="state" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="city">Cidade</Form.Label>
            <Form.Input name="city" />
            <Form.ErrorMessage field="city" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="neighborhood">Bairro</Form.Label>
            <Form.Input name="neighborhood" />
            <Form.ErrorMessage field="neighborhood" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="street">Rua</Form.Label>
            <Form.Input name="street" />
            <Form.ErrorMessage field="street" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="number">Número</Form.Label>
            <Form.Input name="number" />
            <Form.ErrorMessage field="number" />
          </Form.Field>
        </div>
        <div className="flex space-x-3 lg:justify-end">
          <Button
            className="mt-3 bg-red-500 font-bold text-zinc-50 hover:bg-red-600 max-lg:w-full"
            type="button"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button
            className="mt-3 bg-green-500 font-bold text-zinc-50 hover:bg-green-600 max-lg:w-full"
            type="submit"
          >
            {isSubmitting ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              'Atualizar Imóvel'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
