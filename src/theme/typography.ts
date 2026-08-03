import { TextStyle } from 'react-native'

export const typography = {
  h1: { fontSize: 24, fontWeight: '700', lineHeight: 30 } satisfies TextStyle,
  h2: { fontSize: 20, fontWeight: '700', lineHeight: 26 } satisfies TextStyle,
  h3: { fontSize: 18, fontWeight: '700', lineHeight: 24 } satisfies TextStyle,
  body: { fontSize: 14, fontWeight: '400', lineHeight: 20 } satisfies TextStyle,
  bodyBold: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  } satisfies TextStyle,
  label: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    letterSpacing: 0.4,
  } satisfies TextStyle,
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  } satisfies TextStyle,
  button: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  } satisfies TextStyle,
} as const

export type TypographyToken = keyof typeof typography
