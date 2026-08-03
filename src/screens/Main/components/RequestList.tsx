import React, { useCallback } from 'react'
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { colors } from '@/theme'
import { Card } from '@/components/Card'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { SmartCare } from '@/types/smartCare'
import { SmartCareSliceState } from '@/store/slices/smartCareSlice'
import { styles } from '../Main.styles'

interface RequestListProps {
  status: SmartCareSliceState['status']
  items: SmartCare[]
  searchId: string
  onSearchIdChange: (value: string) => void
  onSearch: () => void
  onAddPress: () => void
  onItemPress: (id: string) => void
}

export const RequestList = ({
  status,
  items,
  searchId,
  onSearchIdChange,
  onSearch,
  onAddPress,
  onItemPress,
}: RequestListProps) => {
  const renderItem = useCallback(
    ({ item }: { item: SmartCare }) => (
      <Card
        testID={`main__card--item-${item.id}`}
        accessibilityLabel={`${item.id} ${item.title}`}
        onPress={() => onItemPress(item.id)}
      >
        <Text style={styles.itemId}>#{item.id}</Text>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </Card>
    ),
    [onItemPress],
  )

  const renderBody = () => {
    if (status === 'loading') {
      return (
        <View testID="main__loading" style={styles.centered}>
          <ActivityIndicator color={colors.primary} />
        </View>
      )
    }

    if (items.length === 0) {
      return (
        <View testID="main__empty-state" style={styles.centered}>
          <View style={styles.emptyIconBadge}>
            <Text style={styles.emptyIconGlyph}>✉</Text>
          </View>
          <Text style={styles.emptyTitle}>ยังไม่มี Smart Care</Text>
          <Text style={styles.emptySubtitle}>
            กดปุ่ม "เพิ่มรายการ" เพื่อแจ้งปัญหาใหม่
          </Text>
          <Button
            testID="main__btn--add-empty"
            label="+ เพิ่มรายการ"
            onPress={onAddPress}
          />
        </View>
      )
    }

    return (
      <FlatList
        testID="main__list"
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    )
  }

  return (
    <View style={styles.body}>
      <View style={styles.searchRow}>
        <View style={styles.searchInput}>
          <Input
            testID="main__input--search"
            label="ค้นหา"
            placeholder="ค้นหาด้วย Smart Care ID เช่น SC001"
            value={searchId}
            onChangeText={onSearchIdChange}
            onSubmitEditing={onSearch}
          />
        </View>
        <TouchableOpacity
          testID="main__btn--search"
          accessibilityRole="button"
          accessibilityLabel="ค้นหา"
          style={styles.searchButton}
          onPress={onSearch}
        >
          <Text style={styles.searchButtonLabel}>ค้นหา</Text>
        </TouchableOpacity>
      </View>

      {renderBody()}
    </View>
  )
}
