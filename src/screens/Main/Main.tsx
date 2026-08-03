import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'
import { SmartCare } from '@/types/smartCare'
import { colors } from '@/theme'
import { Card } from '@/components/Card'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  loadStart,
  loadSucceeded,
  selectAllRequests,
  selectRequestsStatus,
} from '@/store/slices/smartCareSlice'
import { styles } from './Main.styles'

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>

export const Main = ({ navigation }: Props) => {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectAllRequests)
  const status = useAppSelector(selectRequestsStatus)
  const [searchId, setSearchId] = useState('')
  const [searchErrorVisible, setSearchErrorVisible] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadStart())
      const timer = setTimeout(() => {
        dispatch(loadSucceeded(items))
      }, 300)
      return () => clearTimeout(timer)
    }
    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const handleSearch = () => {
    const trimmed = searchId.trim()
    if (!trimmed) {
      return
    }
    const found = items.find(item => item.id === trimmed)
    if (found) {
      navigation.navigate('RequestDetail', { id: found.id })
    } else {
      setSearchErrorVisible(true)
    }
  }

  const renderItem = ({ item }: { item: SmartCare }) => (
    <Card
      testID={`main__card--item-${item.id}`}
      accessibilityLabel={`${item.id} ${item.title}`}
      onPress={() => navigation.navigate('RequestDetail', { id: item.id })}
    >
      <Text style={styles.itemId}>#{item.id}</Text>
      <Text style={styles.itemTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </Card>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <View style={styles.headerIconBadge}>
            <Text style={styles.headerIconGlyph}>+</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>Smart Care System</Text>
            <Text style={styles.headerSubtitle}>รายการแจ้งซ่อม</Text>
          </View>
        </View>
        <TouchableOpacity
          testID="main__btn--add"
          accessibilityRole="button"
          accessibilityLabel="เพิ่มรายการ"
          style={styles.addButton}
          onPress={() => navigation.navigate('AddRequest')}
        >
          <Text style={styles.addButtonLabel}>+ เพิ่มรายการ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.searchRow}>
          <View style={styles.searchInput}>
            <Input
              testID="main__input--search"
              label="ค้นหา"
              placeholder="ค้นหาด้วย Smart Care ID เช่น SC001"
              value={searchId}
              onChangeText={setSearchId}
              onSubmitEditing={handleSearch}
            />
          </View>
          <TouchableOpacity
            testID="main__btn--search"
            accessibilityRole="button"
            accessibilityLabel="ค้นหา"
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Text style={styles.searchButtonLabel}>ค้นหา</Text>
          </TouchableOpacity>
        </View>

        {status === 'loading' ? (
          <View testID="main__loading" style={styles.centered}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : items.length === 0 ? (
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
              onPress={() => navigation.navigate('AddRequest')}
            />
          </View>
        ) : (
          <FlatList
            testID="main__list"
            data={items}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>

      <Modal
        testID="main__modal--search-error"
        visible={searchErrorVisible}
        title="ไม่พบ Smart Care"
        message={`ไม่พบหมายเลข ${searchId.trim()} ในระบบ`}
        confirmTestID="main__modal-btn--confirm"
        onConfirm={() => setSearchErrorVisible(false)}
      />
    </View>
  )
}
