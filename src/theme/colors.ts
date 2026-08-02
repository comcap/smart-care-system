export const colors = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  background: '#FFFFFF',
  surface: '#F3F4F6',
  border: '#D1D5DB',
  text: '#111827',
  textMuted: '#6B7280',
  placeholder: '#9CA3AF',
  error: '#DC2626',
  errorSurface: '#FEE2E2',
  success: '#16A34A',
  white: '#FFFFFF',
  overlay: 'rgba(17, 24, 39, 0.5)',
} as const;

export type ColorToken = keyof typeof colors;
