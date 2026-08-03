import * as React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
  },
})

export const withSafeArea = <T extends object>(
  Component: React.ComponentType<T>,
) => {
  const WrappedScreen = (props: T) => {
    return (
      <SafeAreaView edges={['top']} style={styles.container}>
        <Component {...props} />
      </SafeAreaView>
    )
  }

  return WrappedScreen
}
