import React from 'react'
import { Pressable, View, ViewProps } from 'react-native'
import { styles } from './Card.styles'

interface CardProps extends Omit<ViewProps, 'style'> {
  onPress?: () => void
  testID: string
  accessibilityLabel?: string
}

export const Card = ({
  onPress,
  testID,
  accessibilityLabel,
  children,
  ...rest
}: CardProps) => {
  if (onPress) {
    return (
      <Pressable
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      >
        {children}
      </Pressable>
    )
  }

  return (
    <View testID={testID} style={styles.card} {...rest}>
      {children}
    </View>
  )
}
