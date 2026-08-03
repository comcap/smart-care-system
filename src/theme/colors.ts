export const colors = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryForeground: '#FFFFFF',
  background: '#F0F4FF',
  card: '#FFFFFF',
  secondary: '#EFF6FF',
  secondaryForeground: '#1E40AF',
  surface: '#F1F5F9',
  accent: '#DBEAFE',
  accentForeground: '#1E40AF',
  border: '#E2E8F0',
  inputBackground: '#F8FAFC',
  text: '#0F172A',
  textMuted: '#64748B',
  placeholder: '#94A3B8',
  error: '#EF4444',
  errorSurface: '#FEE2E2',
  success: '#16A34A',
  white: '#FFFFFF',
  overlay: 'rgba(15, 23, 42, 0.4)',
} as const

export type ColorToken = keyof typeof colors
