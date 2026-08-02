import { StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerTitle: {
    ...typography.h1,
    color: colors.text,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonLabel: {
    ...typography.h2,
    color: colors.white,
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
    height: 44,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  searchButtonLabel: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
  },
  listContent: {
    paddingBottom: spacing.lg,
  },
  itemId: {
    ...typography.caption,
    color: colors.textMuted,
  },
  itemTitle: {
    ...typography.bodyBold,
    color: colors.text,
  },
});
