import React from 'react'
import { Modal as RNModal, View, Text, Pressable } from 'react-native'
import { Button } from './Button'
import { styles } from './Modal.styles'

interface ModalProps {
  visible: boolean
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  testID: string
  confirmTestID?: string
  cancelLabel?: string
  onCancel?: () => void
  cancelTestID?: string
}

export const Modal = ({
  visible,
  title,
  message,
  confirmLabel = 'ตกลง',
  onConfirm,
  testID,
  confirmTestID = `${testID}--confirm`,
  cancelLabel = 'ยกเลิก',
  onCancel,
  cancelTestID = `${testID}--cancel`,
}: ModalProps) => {
  return (
    <RNModal
      testID={testID}
      visible={visible}
      transparent
      animationType="fade"
      accessibilityViewIsModal
      onRequestClose={onCancel ?? onConfirm}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.iconBadge}>
            <Text style={styles.iconBadgeText}>!</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <Button
            testID={confirmTestID}
            label={confirmLabel}
            onPress={onConfirm}
          />
          {onCancel ? (
            <Pressable
              testID={cancelTestID}
              accessibilityRole="button"
              accessibilityLabel={cancelLabel}
              style={styles.cancelButton}
              onPress={onCancel}
            >
              <Text style={styles.cancelLabel}>{cancelLabel}</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </RNModal>
  )
}
