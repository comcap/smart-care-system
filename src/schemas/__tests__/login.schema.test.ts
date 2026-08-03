import { loginSchema } from '../login.schema'

describe('loginSchema', () => {
  it.each([
    ['13-digit citizen ID with a valid checksum', '1101234567897', true],
    ['13 digits but an invalid checksum', '1234567890123', false],
    ['valid 10-digit mobile phone number', '0812345678', true],
    ['10-digit number with a non-mobile prefix', '0212345678', false],
    ['empty string', '', false],
    ['12 digits (one short of citizen ID)', '123456789012', false],
    ['14 digits (one over citizen ID)', '12345678901234', false],
    ['9 digits (one short of phone)', '081234567', false],
    [
      '11 digits (one over phone, not a valid citizen ID length)',
      '08123456789',
      false,
    ],
    ['non-digit characters', '081234567a', false],
  ] as const)('%s -> success = %s', (_description, identifier, expected) => {
    const result = loginSchema.safeParse({ identifier })
    expect(result.success).toBe(expected)
  })
})
