import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
})

const envData = {
  DATABASE_URL: String(process.env.DATABASE_URL),
}

export const env = envSchema.parse(envData)
