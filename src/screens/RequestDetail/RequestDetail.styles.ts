import { StyleSheet } from 'react-native'
import { colors, spacing, radius, typography, iconSize } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 4,
  },
  backButton: {
    width: iconSize.sm,
    height: iconSize.sm,
    borderRadius: radius.md,
    backgroundColor: colors.overlayOnDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonGlyph: {
    ...typography.h2,
    color: colors.white,
    marginTop: -2,
  },
  headerTitle: {
    ...typography.bodyBold,
    color: colors.white,
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.secondary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
    gap: spacing.sm + 2,
  },
  label: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: spacing.xs + 2,
  },
  value: {
    ...typography.body,
    color: colors.text,
  },
  idValue: {
    ...typography.h2,
    color: colors.primary,
  },
  footerRow: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  footerText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  footerValue: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.text,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
  },
})
