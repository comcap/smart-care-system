import React from 'react'
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/navigation/types'
import { loginSchema, LoginFormValues } from '@/schemas/login.schema'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { useAppDispatch } from '@/store/hooks'
import { loginSuccess } from '@/store/slices/authSlice'
import { styles } from './Login.styles'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

export const Login = ({ navigation }: Props) => {
  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { identifier: '' },
  })

  const onSubmit = (values: LoginFormValues) => {
    dispatch(loginSuccess({ identifier: values.identifier }))
    navigation.replace('Main')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.hero}>
        <View style={styles.heroIconBadge}>
          <Text style={styles.heroIconGlyph}>+</Text>
        </View>
        <Text style={styles.heroTitle}>Smart Care System</Text>
        <Text style={styles.heroSubtitle}>ระบบแจ้งซ่อมบำรุง</Text>
      </View>

      <View style={styles.content}>
        <Card testID="login__card--form">
          <Text style={styles.formLabel}>เข้าสู่ระบบ</Text>
          <Controller
            control={control}
            name="identifier"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="login__input--id"
                label="เลขบัตร ปชช. / เบอร์โทร"
                placeholder="กรอกเลขบัตร ปชช. หรือเบอร์โทร"
                keyboardType="number-pad"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.identifier?.message}
              />
            )}
          />
          <Text style={styles.helperText}>
            * ต้องเป็นตัวเลข 13 หรือ 10 หลัก
          </Text>
        </Card>

        <Button
          testID="login__btn--submit"
          label="เข้าสู่ระบบ"
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        />

        <Text style={styles.footerText}>
          ระบบใช้งานสำหรับพนักงานที่ได้รับอนุญาตเท่านั้น
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
}
