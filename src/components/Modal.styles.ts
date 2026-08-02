import { StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  content: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 360,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  message: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
});
