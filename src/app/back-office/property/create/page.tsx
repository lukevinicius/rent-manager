import { CreatePropertyForm } from './form'

export default function CreateProperty() {
  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Criação de imóvel</p>
      </div>
      <CreatePropertyForm />
    </div>
  )
}
