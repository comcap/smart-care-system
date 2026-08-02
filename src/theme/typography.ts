import { TextStyle } from 'react-native';

export const typography = {
  h1: { fontSize: 28, fontWeight: '700', lineHeight: 34 } satisfies TextStyle,
  h2: { fontSize: 22, fontWeight: '700', lineHeight: 28 } satisfies TextStyle,
  body: { fontSize: 16, fontWeight: '400', lineHeight: 22 } satisfies TextStyle,
  bodyBold: { fontSize: 16, fontWeight: '600', lineHeight: 22 } satisfies TextStyle,
  caption: { fontSize: 13, fontWeight: '400', lineHeight: 18 } satisfies TextStyle,
  button: { fontSize: 16, fontWeight: '600', lineHeight: 20 } satisfies TextStyle,
} as const;

export type TypographyToken = keyof typeof typography;
