import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'
import { Modal } from '@/components/Modal'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  loadStart,
  loadSucceeded,
  selectAllRequests,
  selectRequestsStatus,
} from '@/store/slices/smartCareSlice'
import { logout } from '@/store/slices/authSlice'
import { MainHeader } from './components/MainHeader'
import { RequestList } from './components/RequestList'
import { styles } from './Main.styles'

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>

// Placeholder delay standing in for a real API call until a backend exists.
const FAKE_LOAD_DELAY_MS = 3000

export const Main = ({ navigation }: Props) => {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectAllRequests)
  const status = useAppSelector(selectRequestsStatus)
  const [searchId, setSearchId] = useState('')
  const [searchErrorVisible, setSearchErrorVisible] = useState(false)
  const [logoutModalVisible, setLogoutModalVisible] = useState(false)

  useEffect(() => {
    if (status !== 'idle') {
      return undefined
    }
    dispatch(loadStart())
    const timer = setTimeout(() => {
      dispatch(loadSucceeded(items))
    }, FAKE_LOAD_DELAY_MS)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = useCallback(() => {
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
  }, [searchId, items, navigation])

  const handleItemPress = useCallback(
    (id: string) => navigation.navigate('RequestDetail', { id }),
    [navigation],
  )

  const handleAddPress = useCallback(
    () => navigation.navigate('AddRequest'),
    [navigation],
  )

  return (
    <View style={styles.container}>
      <MainHeader
        onAddPress={handleAddPress}
        onMenuPress={() => setLogoutModalVisible(true)}
      />
      <RequestList
        status={status}
        items={items}
        searchId={searchId}
        onSearchIdChange={setSearchId}
        onSearch={handleSearch}
        onAddPress={handleAddPress}
        onItemPress={handleItemPress}
      />
      <Modal
        testID="main__modal--search-error"
        visible={searchErrorVisible}
        title="ไม่พบ Smart Care"
        message={`ไม่พบหมายเลข ${searchId.trim()} ในระบบ`}
        confirmTestID="main__modal-btn--confirm"
        onConfirm={() => setSearchErrorVisible(false)}
      />
      <Modal
        testID="main__modal--logout"
        visible={logoutModalVisible}
        title="ออกจากระบบ"
        message="ต้องการออกจากระบบใช่หรือไม่"
        confirmLabel="ออกจากระบบ"
        confirmTestID="main__modal-btn--confirm-logout"
        onConfirm={() => {
          dispatch(logout())
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
        }}
        cancelTestID="main__modal-btn--cancel-logout"
        onCancel={() => setLogoutModalVisible(false)}
      />
    </View>
  )
}
