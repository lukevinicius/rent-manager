'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useEdgeStore } from '@/lib/edgestore'

import { Form } from '@/components/Form'
import { SingleImageDropzone } from '@/components/single-image-dropzone'
import { Button } from '@/components/ui/button'

import { createProperty } from '@/actions/create-property'

const formSchema = z.object({
  // image is of type File
  image: z.any(),
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  zip: z.string().min(8, 'O CEP deve ter no mínimo 8 caracteres'),
  state: z.string().min(2, 'O estado deve ter no mínimo 2 caracteres'),
  city: z.string().min(3, 'A cidade deve ter no mínimo 3 caracteres'),
  neighborhood: z.string().min(3, 'O bairro deve ter no mínimo 3 caracteres'),
  street: z.string().min(3, 'A rua deve ter no mínimo 3 caracteres'),
  number: z.string().min(1, 'O número deve ter no mínimo 1 caractere'),
})

type FormProps = z.infer<typeof formSchema>

export function CreatePropertyForm() {
  const router = useRouter()
  const { edgestore } = useEdgeStore()
  const [file, setFile] = useState<File>()
  const createPropertyForm = useForm<FormProps>({
    resolver: zodResolver(formSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createPropertyForm

  const handleCreateProperty: SubmitHandler<FormProps> = async (
    data: FormProps,
  ) => {
    let imageUrl = ''
    if (file) {
      const { url } = await edgestore.publicFiles.upload({
        file: file as File,
        /* onProgressChange: (progress) => {
          // you can use this to show a progress bar
          console.log(progress)
        }, */
      })

      imageUrl = url
    }

    await createProperty({
      image: imageUrl,
      name: data.name,
      zip: data.zip,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      number: data.number,
    })
  }

  return (
    <FormProvider {...createPropertyForm}>
      <form
        onSubmit={handleSubmit(handleCreateProperty)}
        className="space-y-6 rounded-xl bg-zinc-800 p-3"
      >
        <SingleImageDropzone
          width={200}
          height={200}
          value={file}
          onChange={(file) => {
            setFile(file as File)
          }}
        />
        <Button
          className="bg-blue-600 font-bold hover:bg-blue-700"
          type="button"
          onClick={async () => {
            if (file) {
              const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                  // you can use this to show a progress bar
                  console.log(progress)
                },
              })
              // you can run some server action or api here
              // to add the necessary data to your database
              console.log(res)
            }
          }}
        >
          Subir imagem
        </Button>
        <div className="grid-cols-2 gap-3 max-lg:space-y-3 lg:grid">
          <Form.Field>
            <Form.Label htmlFor="name">Nome do imóvel</Form.Label>
            <Form.Input placeholder="Nome" name="name" />
            <Form.ErrorMessage field="name" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="zip">CEP</Form.Label>
            <Form.Input placeholder="Usuário" name="zip" />
            <Form.ErrorMessage field="zip" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="state">Estado</Form.Label>
            <Form.Input placeholder="state" name="state" />
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
              <Loader className="h-6 w-6 animate-spin" />
            ) : (
              'Criar Imóvel'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
