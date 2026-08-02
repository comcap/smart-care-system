import React from 'react';
import { Modal as RNModal, View, Text } from 'react-native';
import { Button } from './Button';
import { styles } from './Modal.styles';

interface ModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  testID: string;
  confirmTestID?: string;
}

export function Modal({
  visible,
  title,
  message,
  confirmLabel = 'ตกลง',
  onConfirm,
  testID,
  confirmTestID = `${testID}-btn-confirm`,
}: ModalProps) {
  return (
    <RNModal
      testID={testID}
      visible={visible}
      transparent
      animationType="fade"
      accessibilityViewIsModal
      onRequestClose={onConfirm}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <Button testID={confirmTestID} label={confirmLabel} onPress={onConfirm} />
        </View>
      </View>
    </RNModal>
  );
}
