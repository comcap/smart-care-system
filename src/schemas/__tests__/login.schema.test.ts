import { loginSchema } from '../login.schema'

describe('loginSchema', () => {
  it('should pass when identifier is a valid 13-digit citizen ID', () => {
    const result = loginSchema.safeParse({ identifier: '1234567890123' })
    expect(result.success).toBe(true)
  })

  it('should pass when identifier is a valid 10-digit phone number', () => {
    const result = loginSchema.safeParse({ identifier: '0812345678' })
    expect(result.success).toBe(true)
  })

  it('should fail when identifier is empty', () => {
    const result = loginSchema.safeParse({ identifier: '' })
    expect(result.success).toBe(false)
  })

  it('should fail when identifier has 12 digits (one short of citizen ID)', () => {
    const result = loginSchema.safeParse({ identifier: '123456789012' })
    expect(result.success).toBe(false)
  })

  it('should fail when identifier has 14 digits (one over citizen ID)', () => {
    const result = loginSchema.safeParse({ identifier: '12345678901234' })
    expect(result.success).toBe(false)
  })

  it('should fail when identifier has 9 digits (one short of phone)', () => {
    const result = loginSchema.safeParse({ identifier: '081234567' })
    expect(result.success).toBe(false)
  })

  it('should fail when identifier has 11 digits (one over phone, not a valid citizen ID length)', () => {
    const result = loginSchema.safeParse({ identifier: '08123456789' })
    expect(result.success).toBe(false)
  })

  it('should fail when identifier contains non-digit characters', () => {
    const result = loginSchema.safeParse({ identifier: '081234567a' })
    expect(result.success).toBe(false)
  })
})
