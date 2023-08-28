'use client'

import { ChangeEvent, InputHTMLAttributes } from 'react'
import { useFileInput } from './Root'
import { useFormContext } from 'react-hook-form'

export type ControlProps = InputHTMLAttributes<HTMLInputElement>

export function Control(props: ControlProps) {
  const { register } = useFormContext()
  const { onFilesSelected, multiple, id } = useFileInput()

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      return
    }

    const files = Array.from(event.target.files)

    onFilesSelected(files)
  }

  return (
    <input
      id={id}
      {...register(id)}
      type="file"
      className="sr-only"
      onChange={handleFilesSelected}
      multiple={multiple}
      {...props}
    />
  )
}
