import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../Main.styles'

interface MainHeaderProps {
  onAddPress: () => void
  onMenuPress: () => void
}

export const MainHeader = ({ onAddPress, onMenuPress }: MainHeaderProps) => (
  <View style={styles.header}>
    <View style={styles.headerTitleRow}>
      <View style={styles.headerIconBadge}>
        <Text style={styles.headerIconGlyph}>❤️</Text>
      </View>
      <View>
        <Text style={styles.headerTitle}>Smart Care System</Text>
        <Text style={styles.headerSubtitle}>รายการแจ้งซ่อม</Text>
      </View>
    </View>
    <View style={styles.headerActions}>
      <TouchableOpacity
        testID="main__btn--add"
        accessibilityRole="button"
        accessibilityLabel="เพิ่มรายการ"
        style={styles.addButton}
        onPress={onAddPress}
      >
        <Text style={styles.addButtonLabel}>+ เพิ่มรายการ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="main__btn--menu"
        accessibilityRole="button"
        accessibilityLabel="เมนู"
        style={styles.iconButton}
        onPress={onMenuPress}
      >
        <Text style={styles.iconButtonGlyph}>☰</Text>
      </TouchableOpacity>
    </View>
  </View>
)
