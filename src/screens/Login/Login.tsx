import React from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { loginSchema, LoginFormValues } from '../../schemas/login.schema';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAppDispatch } from '../../store/hooks';
import { loginSuccess } from '../../store/slices/authSlice';
import { styles } from './Login.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function Login({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { identifier: '' },
  });

  const onSubmit = (values: LoginFormValues) => {
    dispatch(loginSuccess({ identifier: values.identifier }));
    navigation.replace('Main');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.content}>
        <Text style={styles.title}>Smart Care System</Text>
        <Controller
          control={control}
          name="identifier"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              testID="login-input-id"
              label="เลขบัตร ปชช. หรือเบอร์โทร"
              placeholder="กรอกเลขบัตร ปชช. หรือเบอร์โทร"
              keyboardType="number-pad"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.identifier?.message}
            />
          )}
        />
        <Button
          testID="login-btn-submit"
          label="เข้าสู่ระบบ"
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
