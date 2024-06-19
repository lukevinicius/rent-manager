import * as z from 'zod'

export const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

// type z.infer<typeof LoginSchema>
export type LoginSchemaType = z.infer<typeof LoginSchema>
