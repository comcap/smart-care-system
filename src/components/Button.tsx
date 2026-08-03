import React from 'react'
import {
  Pressable,
  Text,
  ActivityIndicator,
  PressableProps,
} from 'react-native'
import { colors } from '@/theme'
import { styles } from './Button.styles'

interface ButtonProps extends Omit<PressableProps, 'style'> {
  label: string
  loading?: boolean
  testID: string
}

export const Button = ({
  label,
  loading = false,
  disabled,
  testID,
  ...rest
}: ButtonProps) => {
  const isDisabled = disabled || loading

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator testID={`${testID}--loading`} color={colors.white} />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </Pressable>
  )
}
