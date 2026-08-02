import { z } from 'zod';

const citizenIdPattern = /^\d{13}$/;
const phonePattern = /^\d{10}$/;

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, 'กรุณากรอกเลขบัตร ปชช. หรือเบอร์โทร')
    .refine(
      value => citizenIdPattern.test(value) || phonePattern.test(value),
      'กรุณากรอกเลขบัตร ปชช. 13 หลัก หรือเบอร์โทร 10 หลัก',
    ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
