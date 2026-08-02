import { StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

export const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
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
});
