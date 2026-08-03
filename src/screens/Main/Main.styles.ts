import { StyleSheet, ViewStyle } from 'react-native'
import { colors, spacing, radius, typography, iconSize } from '@/theme'

const circleBadge: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
}

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
    ...circleBadge,
    width: iconSize.sm,
    height: iconSize.sm,
    borderRadius: radius.md,
    backgroundColor: colors.overlayOnDark,
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
  headerActions: { flexDirection: 'row', alignItems: 'center' },
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
  iconButton: {
    ...circleBadge,
    width: iconSize.md,
    height: iconSize.md,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    marginLeft: spacing.sm,
  },
  iconButtonGlyph: {
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
    ...circleBadge,
    width: iconSize.xl,
    height: iconSize.xl,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
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
