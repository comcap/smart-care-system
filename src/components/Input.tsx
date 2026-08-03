import React from 'react'
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
} from 'react-native'
import { styles } from './Input.styles'

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string
  error?: string
  testID: string
  inputStyle?: StyleProp<TextStyle>
}

export const Input = ({
  label,
  error,
  testID,
  inputStyle,
  ...rest
}: InputProps) => {
  const labelId = label ? `${testID}--label` : undefined

  return (
    <View style={styles.container}>
      {label ? (
        <Text style={styles.label} nativeID={labelId}>
          {label}
        </Text>
      ) : null}
      <TextInput
        testID={testID}
        accessibilityLabel={label || rest.placeholder}
        accessibilityLabelledBy={labelId}
        placeholderTextColor="#9CA3AF"
        style={[styles.input, error && styles.inputError, inputStyle]}
        {...rest}
      />
      {error ? (
        <Text
          testID={`${testID}--error`}
          style={styles.errorText}
          accessibilityRole="alert"
        >
          {error}
        </Text>
      ) : null}
    </View>
  )
}
