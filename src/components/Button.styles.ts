import { StyleSheet } from 'react-native'
import { colors, spacing, radius, typography } from '../theme'

export const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 6,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  disabled: {
    backgroundColor: colors.border,
  },
  label: {
    ...typography.button,
    color: colors.white,
  },
})
