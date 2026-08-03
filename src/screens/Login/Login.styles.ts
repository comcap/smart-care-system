import { StyleSheet } from 'react-native'
import { colors, spacing, radius, typography, iconSize } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    minHeight: '38%',
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: spacing.xl,
  },
  heroIconBadge: {
    width: iconSize.xxl,
    height: iconSize.xxl,
    borderRadius: radius.xl,
    backgroundColor: colors.overlayOnDarkSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heroIconGlyph: {
    ...typography.h1,
    color: colors.white,
  },
  heroTitle: {
    ...typography.h2,
    color: colors.white,
  },
  heroSubtitle: {
    ...typography.body,
    color: colors.secondary,
    marginTop: spacing.xs,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg + 4,
  },
  formLabel: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: spacing.sm + 4,
  },
  helperText: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  footerText: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
})
