import React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { addRequestSchema, AddRequestFormValues } from '../../schemas/addRequest.schema';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAppDispatch } from '../../store/hooks';
import { requestAdded } from '../../store/slices/smartCareSlice';
import { styles } from './AddRequest.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'AddRequest'>;

export function AddRequest({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<AddRequestFormValues>({
    resolver: zodResolver(addRequestSchema),
    mode: 'onChange',
    defaultValues: { title: '', description: '' },
  });

  const onSubmit = (values: AddRequestFormValues) => {
    dispatch(requestAdded(values));
    navigation.navigate('Main');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.content}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              testID="add-request-input-title"
              label="Title"
              placeholder="กรอก Title"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.title?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              testID="add-request-input-description"
              label="Description"
              placeholder="กรอก Description"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.description?.message}
              multiline
              numberOfLines={4}
            />
          )}
        />
        <Button
          testID="add-request-btn-submit"
          label="บันทึก"
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
