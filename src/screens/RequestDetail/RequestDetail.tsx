import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Card } from '../../components/Card';
import { useAppSelector } from '../../store/hooks';
import { selectRequestById } from '../../store/slices/smartCareSlice';
import { formatDate } from '../../utils/date';
import { styles } from './RequestDetail.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'RequestDetail'>;

export function RequestDetail({ route }: Props) {
  const { id } = route.params;
  const request = useAppSelector(state => selectRequestById(state, id));

  if (!request) {
    return (
      <View style={styles.container}>
        <Text testID="request-detail-error" style={styles.errorText}>
          ไม่พบข้อมูล Smart Care ID นี้
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card testID="request-detail-card">
        <Text style={styles.label}>Smart Care ID</Text>
        <Text style={styles.value}>{request.id}</Text>

        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>{request.title}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{request.description}</Text>

        <Text style={styles.label}>วันที่แจ้ง</Text>
        <Text style={styles.value}>{formatDate(request.createdAt)}</Text>
      </Card>
    </View>
  );
}
