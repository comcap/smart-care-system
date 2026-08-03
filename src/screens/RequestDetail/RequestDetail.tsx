import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'
import { Card } from '@/components/Card'
import { useAppSelector } from '@/store/hooks'
import { selectRequestById } from '@/store/slices/smartCareSlice'
import { formatDate } from '@/utils/date'
import { styles } from './RequestDetail.styles'

type Props = NativeStackScreenProps<RootStackParamList, 'RequestDetail'>

export const RequestDetail = ({ navigation, route }: Props) => {
  const { id } = route.params
  const request = useAppSelector(state => selectRequestById(state, id))

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          testID="request-detail__btn--back"
          accessibilityRole="button"
          accessibilityLabel="ย้อนกลับ"
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonGlyph}>‹</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>รายละเอียด</Text>
          <Text style={styles.headerSubtitle}>#{id}</Text>
        </View>
      </View>

      {!request ? (
        <View style={styles.centered}>
          <Text testID="request-detail__error" style={styles.errorText}>
            ไม่พบข้อมูล Smart Care ID นี้
          </Text>
        </View>
      ) : (
        <ScrollView
          testID="request-detail__card"
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <Card testID="request-detail__card--id">
            <Text style={styles.label}>Smart Care ID</Text>
            <Text testID="request-detail__id--value" style={styles.idValue}>
              #{request.id}
            </Text>
          </Card>

          <Card testID="request-detail__card--title">
            <Text style={styles.label}>Title</Text>
            <Text style={styles.value}>{request.title}</Text>
          </Card>

          <Card testID="request-detail__card--description">
            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{request.description}</Text>
          </Card>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>
              สร้างเมื่อ:{' '}
              <Text style={styles.footerValue}>
                {formatDate(request.createdAt)}
              </Text>
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  )
}
