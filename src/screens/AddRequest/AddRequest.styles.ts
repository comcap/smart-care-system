import { StyleSheet } from 'react-native'
import { colors, spacing, radius, typography } from '@/theme'

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
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
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
    gap: spacing.md,
  },
  fieldLabel: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: spacing.sm + 4,
  },
  textarea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
})
