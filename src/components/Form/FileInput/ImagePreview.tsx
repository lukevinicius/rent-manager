'use client'

import { useFileInput } from './Root'
import { useMemo } from 'react'

// eslint-disable-next-line
export interface ImagePreviewProps {}

export function ImagePreview(props: ImagePreviewProps) {
  const { multiple, files } = useFileInput()

  if (multiple) {
    throw new Error(
      'Cannot use <ImagePreview /> component alongside multiple file upload input.',
    )
  }

  const previewURL = useMemo(() => {
    if (files.length === 0) {
      return null
    }

    return URL.createObjectURL(files[0])
  }, [files])

  if (previewURL === null) {
    return (
      <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-violet-50 dark:bg-zinc-800"></div>
    )
  } else {
    return (
      <img
        className="h-20 w-20 rounded-xl bg-violet-50 object-cover dark:bg-zinc-800"
        src={previewURL}
        alt=""
      />
    )
  }
}
