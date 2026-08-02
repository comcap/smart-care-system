import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { styles } from './Input.styles';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
  testID: string;
}

export function Input({ label, error, testID, ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label} nativeID={`${testID}-label`}>
        {label}
      </Text>
      <TextInput
        testID={testID}
        accessibilityLabel={label}
        accessibilityLabelledBy={`${testID}-label`}
        placeholderTextColor="#9CA3AF"
        style={[styles.input, error && styles.inputError]}
        {...rest}
      />
      {error ? (
        <Text testID={`${testID}-error`} style={styles.errorText} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
