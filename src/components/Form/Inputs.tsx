import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function Input(props: InputProps) {
  const { register } = useFormContext()

  return (
    <div className="flex">
      <input
        id={props.name}
        className="w-full rounded border border-zinc-300 px-3 py-2 text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        {...register(props.name)}
        {...props}
      />
    </div>
  )
}

/* interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  maskType: string
}

export function InputMask(props: InputMaskProps) {
  const { register } = useFormContext()

  function selectMask(mask: string) {
    switch (mask) {
      case 'cpf':
        return '999.999.999-99'
      case 'cnpj':
        return '99.999.999/9999-99'
      case 'phone':
        return '(99) 99999-9999'
      case 'cep':
        return '99999-999'
      default:
        return '99/99/9999'
    }
  }

  return (
    <InputInMask
      id={props.name}
      mask={selectMask(props.maskType)}
      className="flex-1 rounded border border-zinc-300 px-3 py-2 text-zinc-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      {...register(props.name)}
      {...props}
    />
  )
} */
