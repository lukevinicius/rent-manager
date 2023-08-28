import { SelectHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
}

export function Select(props: SelectProps) {
  const { register } = useFormContext()

  return (
    <select
      id={props.name}
      className="flex-1 rounded border border-zinc-300 px-3 py-2 text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      {...register(props.name)}
      {...props}
    />
  )
}
