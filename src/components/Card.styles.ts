import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  pressed: {
    backgroundColor: colors.border,
  },
});
