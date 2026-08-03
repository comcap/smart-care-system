import { z } from 'zod'

const citizenIdShapePattern = /^\d{13}$/
// Mobile numbers only: leading 0 then a 6/8/9 prefix, 10 digits total.
const thaiMobilePattern = /^0[689]\d{8}$/

// Thai citizen ID checksum (mod 11): each of the first 12 digits is weighted
// by (13 - position), and the 13th digit must equal (11 - sum % 11) % 10.
function isValidThaiCitizenId(value: string): boolean {
  if (!citizenIdShapePattern.test(value)) {
    return false
  }
  const digits = value.split('').map(Number)
  const sum = digits
    .slice(0, 12)
    .reduce((acc, digit, index) => acc + digit * (13 - index), 0)
  const checkDigit = (11 - (sum % 11)) % 10
  return checkDigit === digits[12]
}

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, 'กรุณากรอกเลขบัตร ปชช. หรือเบอร์โทร')
    .refine(
      value => isValidThaiCitizenId(value) || thaiMobilePattern.test(value),
      'กรุณากรอกเลขบัตร ปชช. 13 หลักที่ถูกต้อง หรือเบอร์โทรมือถือ 10 หลัก',
    ),
})

export type LoginFormValues = z.infer<typeof loginSchema>
