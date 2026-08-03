import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'
import {
  addRequestSchema,
  AddRequestFormValues,
} from '@/schemas/addRequest.schema'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { useAppDispatch } from '@/store/hooks'
import { requestAdded } from '@/store/slices/smartCareSlice'
import { styles } from './AddRequest.styles'

type Props = NativeStackScreenProps<RootStackParamList, 'AddRequest'>

export const AddRequest = ({ navigation }: Props) => {
  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<AddRequestFormValues>({
    resolver: zodResolver(addRequestSchema),
    mode: 'onChange',
    defaultValues: { title: '', description: '' },
  })

  const onSubmit = (values: AddRequestFormValues) => {
    dispatch(requestAdded(values))
    navigation.navigate('Main')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity
          testID="add-request__btn--back"
          accessibilityRole="button"
          accessibilityLabel="ย้อนกลับ"
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonGlyph}>‹</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>เพิ่ม Smart Care Request</Text>
          <Text style={styles.headerSubtitle}>กรอกข้อมูลปัญหาที่พบ</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <Card testID="add-request__card--title">
          <Text style={styles.fieldLabel}>Title *</Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="add-request__input--title"
                placeholder="เช่น ปัญหาแอร์เสียชั้น 5"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.title?.message}
              />
            )}
          />
        </Card>

        <Card testID="add-request__card--description">
          <Text style={styles.fieldLabel}>Description *</Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="add-request__input--description"
                placeholder="อธิบายปัญหาที่พบอย่างละเอียด..."
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.description?.message}
                multiline
                numberOfLines={6}
                inputStyle={styles.textarea}
              />
            )}
          />
        </Card>

        <Button
          testID="add-request__btn--submit"
          label="บันทึก"
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
