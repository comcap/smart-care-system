import { StyleSheet } from 'react-native'
import { colors, spacing, radius, typography } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexShrink: 1,
  },
  headerIconBadge: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconGlyph: {
    ...typography.bodyBold,
    color: colors.white,
  },
  headerTitle: {
    ...typography.bodyBold,
    color: colors.white,
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.secondary,
  },
  addButton: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.sm,
    borderRadius: radius.xl,
  },
  addButtonLabel: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
  },
  searchButton: {
    height: 48,
    marginTop: 24,
    paddingHorizontal: spacing.md,
    borderRadius: radius.xl,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonLabel: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyIconBadge: {
    width: 64,
    height: 64,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm + 4,
  },
  emptyIconGlyph: {
    ...typography.h1,
    color: colors.textMuted,
  },
  emptyTitle: {
    ...typography.bodyBold,
    color: colors.text,
  },
  emptySubtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: spacing.lg,
  },
  itemId: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.primary,
  },
  itemTitle: {
    ...typography.bodyBold,
    color: colors.text,
    marginTop: spacing.xs / 2,
  },
})
