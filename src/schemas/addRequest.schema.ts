import { z } from 'zod'

export const addRequestSchema = z.object({
  title: z.string().trim().min(1, 'กรุณากรอก Title'),
  description: z.string().trim().min(1, 'กรุณากรอก Description'),
})

export type AddRequestFormValues = z.infer<typeof addRequestSchema>
